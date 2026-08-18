/**
 * API Routes — REST endpoints for TechScroll AI
 */

import express from "express";
import { sampleReels, demoScenarioReels } from "../data/sampleReels.js";
import { analyzeReels } from "../agents/reelAnalyzer.js";
import { inferInterests } from "../agents/interestInference.js";
import { generateRecommendation } from "../agents/recommendationEngine.js";
import { validateRecommendation } from "../agents/qualityValidator.js";

const router = express.Router();

// GET /api/health
router.get("/health", (req, res) => {
  res.json({
    status: "ok",
    provider: process.env.AI_PROVIDER || "mock",
    timestamp: new Date().toISOString()
  });
});

// GET /api/reels — Return all sample reels
router.get("/reels", (req, res) => {
  res.json({ reels: sampleReels });
});

// GET /api/reels/demo — Return the hackathon demo scenario reels
router.get("/reels/demo", (req, res) => {
  res.json({ reels: demoScenarioReels });
});

// POST /api/analyze — Run the full AI agent pipeline
// Body: { reelIds: string[] }  (empty = use demo scenario reels)
router.post("/analyze", async (req, res) => {
  try {
    const { reelIds = [] } = req.body;

    // Validate: reelIds must be an array of strings, capped at 12
    if (!Array.isArray(reelIds)) {
      return res.status(400).json({ error: "reelIds must be an array" });
    }
    if (reelIds.length > 12) {
      return res.status(400).json({ error: "reelIds may contain at most 12 entries" });
    }
    if (reelIds.some(id => typeof id !== "string" || id.length > 64)) {
      return res.status(400).json({ error: "Each reel ID must be a string of at most 64 characters" });
    }

    // Select reels to analyze
    let reelsToAnalyze;
    if (reelIds.length === 0) {
      reelsToAnalyze = demoScenarioReels;
    } else {
      reelsToAnalyze = sampleReels.filter(r => reelIds.includes(r.id));
      if (reelsToAnalyze.length === 0) {
        return res.status(400).json({ error: "No valid reel IDs provided" });
      }
    }

    console.log(`[Pipeline] Analyzing ${reelsToAnalyze.length} reels...`);

    // ─── Agent 1: Reel Understanding ───────────────────────────────────────
    console.log("[Agent 1] Reel Understanding Agent — analyzing semantics...");
    const reelAnalyses = await analyzeReels(reelsToAnalyze);

    // ─── Agent 2: Interest Inference ───────────────────────────────────────
    console.log("[Agent 2] Interest Inference Agent — inferring broader interests...");
    const interestProfile = await inferInterests(reelAnalyses, reelsToAnalyze);

    // ─── Agent 3: Recommendation Generation ────────────────────────────────
    console.log("[Agent 3] Recommendation Agent — generating semantic recommendation...");
    let recommendation = await generateRecommendation(interestProfile, reelsToAnalyze);

    // ─── Agent 4: Quality Validation (with retry) ──────────────────────────
    console.log("[Agent 4] Quality Validator — checking for hype/clickbait...");
    let validation = await validateRecommendation(recommendation);
    let retryCount = 0;

    while (!validation.passed && retryCount < 2) {
      console.log(`[Agent 4] Recommendation rejected. Retrying... (attempt ${retryCount + 1})`);
      recommendation = await generateRecommendation(interestProfile, reelsToAnalyze);
      validation = await validateRecommendation(recommendation);
      retryCount++;
    }

    // ─── Final Response ─────────────────────────────────────────────────────
    console.log("[Pipeline] Complete! Sending response.");

    res.json({
      success: true,
      pipeline: {
        reelsAnalyzed: reelsToAnalyze.length,
        provider: process.env.AI_PROVIDER || "mock",
        retries: retryCount
      },
      reelAnalyses,
      interestProfile,
      recommendation,
      validation,
      // The hackathon explanation data
      explanation: buildExplanation(interestProfile, recommendation, validation)
    });
  } catch (err) {
    console.error("[Pipeline] Fatal error:", err);
    res.status(500).json({
      success: false,
      error: "Analysis pipeline failed"
    });
  }
});

/**
 * Build a human-readable explanation for the UI
 */
function buildExplanation(interestProfile, recommendation, validation) {
  const topInterests = (interestProfile.interests || [])
    .filter(i => i.confidence === "High")
    .slice(0, 3);

  return {
    interactionSummary: interestProfile.interestPattern,
    reasoningSteps: [
      ...topInterests.map(i => `✓ Strong ${i.name} interest detected (score: ${i.score?.toFixed(2)})`),
      ...(recommendation.why || []).map(w => `✓ ${w}`)
    ],
    shallowVsSmart: {
      shallow: {
        input: "Java Meme",
        process: "Java keyword → Match Java content",
        output: "Another Java Reel"
      },
      smart: {
        input: "Multiple diverse interactions",
        process: "Semantic analysis → Pattern detection → Broader interest inference → Quality filter",
        output: recommendation.recommendation?.title || "Semantic tech recommendation"
      }
    },
    qualityFilterExplanation: validation.passed
      ? `Recommendation passed quality check (score: ${validation.qualityScore?.toFixed(2)})`
      : `Recommendation was rejected and regenerated`,
    rejectedExample: recommendation.rejectedRecommendation || null
  };
}

export default router;
