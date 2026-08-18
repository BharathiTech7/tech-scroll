/**
 * TechScroll AI — Agent Unit Tests (Tests A–E)
 * Uses Node.js built-in test runner (node:test). No external dependencies.
 * All tests are deterministic — no network calls, no LLM API required.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

// Direct imports of pure mock functions and heuristic validator
import {
  getMockInterestInference,
  getMockReelAnalysis,
  getMockRecommendation,
} from "../src/services/mockResponses.js";

import { validateRecommendation } from "../src/agents/qualityValidator.js";

// ─── Test A: Java Trap ────────────────────────────────────────────────────────
// The built-in trap: Java meme + SE lifestyle + coding interview + laptop
// A shallow system says "user likes Java". The AI must infer "Software Engineering".
describe("Test A — Java Trap: Broader Interest Inference", () => {
  const javaTrapAnalyses = [
    getMockReelAnalysis({ id: "reel_01" }), // Java meme
    getMockReelAnalysis({ id: "reel_02" }), // Software engineer lifestyle
    getMockReelAnalysis({ id: "reel_03" }), // Coding interview
    getMockReelAnalysis({ id: "reel_04" }), // MacBook vs Windows for devs
  ];

  it('primary interest must NOT be the shallow keyword "Java"', () => {
    const profile = getMockInterestInference(javaTrapAnalyses);
    assert.notStrictEqual(
      profile.primaryInterest.name.toLowerCase(),
      "java",
      'Shallow keyword match "Java" must not be the primary interest'
    );
  });

  it("primary interest must reflect Software Engineering / Technology domain", () => {
    const profile = getMockInterestInference(javaTrapAnalyses);
    const name = profile.primaryInterest.name.toLowerCase();
    assert.ok(
      name.includes("software") ||
        name.includes("engineering") ||
        name.includes("technology") ||
        name.includes("developer"),
      `Expected broader domain (Software Engineering/Technology), got: "${profile.primaryInterest.name}"`
    );
  });

  it("primary interest score must be >= 0.8 (strong signal)", () => {
    const profile = getMockInterestInference(javaTrapAnalyses);
    assert.ok(
      profile.primaryInterest.score >= 0.8,
      `Score should be >= 0.8, got ${profile.primaryInterest.score}`
    );
  });

  it("confidence must be High for the Java trap scenario", () => {
    const profile = getMockInterestInference(javaTrapAnalyses);
    assert.strictEqual(profile.primaryInterest.confidence, "High");
  });
});

// ─── Test B: AI-Focused Interest Detection ───────────────────────────────────
describe("Test B — AI-Focused Interest Detection", () => {
  it("AI reel should receive Very High or High technology relevance", () => {
    const aiReel = getMockReelAnalysis({ id: "reel_06" }); // GPT-4o reel
    assert.ok(
      ["High", "Very High"].includes(aiReel.technologyRelevance),
      `AI reel must have High/Very High tech relevance, got: ${aiReel.technologyRelevance}`
    );
  });

  it("AI reel must include AI-related technical concepts", () => {
    const aiReel = getMockReelAnalysis({ id: "reel_06" });
    const hasAIConcept = aiReel.technicalConcepts.some(
      (c) =>
        c.toLowerCase().includes("ai") ||
        c.toLowerCase().includes("llm") ||
        c.toLowerCase().includes("gpt") ||
        c.toLowerCase().includes("neural") ||
        c.toLowerCase().includes("model")
    );
    assert.ok(
      hasAIConcept,
      `AI reel technical concepts must include AI terms. Got: [${aiReel.technicalConcepts.join(", ")}]`
    );
  });

  it("Artificial Intelligence must appear in the interest profile with score > 0.5", () => {
    const profile = getMockInterestInference([getMockReelAnalysis({ id: "reel_06" })]);
    const aiInterest = profile.interests.find(
      (i) =>
        i.name.toLowerCase().includes("ai") ||
        i.name.toLowerCase().includes("artificial intelligence") ||
        i.name.toLowerCase().includes("machine learning")
    );
    assert.ok(aiInterest, "AI / Artificial Intelligence must appear in the interest profile");
    assert.ok(
      aiInterest.score > 0.5,
      `AI interest score must be > 0.5, got ${aiInterest.score}`
    );
  });
});

// ─── Test C: Entertainment Should Not Override Tech Interests ─────────────────
describe("Test C — Entertainment Should Not Dominate Over Tech Interests", () => {
  it("entertainment reel should receive Very Low or Low technology relevance", () => {
    // Pass category so the fallback uses the correct technologyRelevance
    const entertainmentReel = getMockReelAnalysis({
      id: "reel_12",
      category: "Entertainment",
    });
    assert.ok(
      ["Very Low", "Low"].includes(entertainmentReel.technologyRelevance),
      `Entertainment reel must have Very Low/Low tech relevance, got: ${entertainmentReel.technologyRelevance}`
    );
  });

  it("low-engagement gaming reel (reel_05) should have Low tech relevance", () => {
    const gamingReel = getMockReelAnalysis({ id: "reel_05" }); // Gaming setup — 42% watch, not liked
    assert.ok(
      ["Very Low", "Low"].includes(gamingReel.technologyRelevance),
      `Gaming reel must have Low tech relevance, got: ${gamingReel.technologyRelevance}`
    );
  });

  it("tech interests must score higher than gaming in the full interest profile", () => {
    const profile = getMockInterestInference([
      getMockReelAnalysis({ id: "reel_02" }), // SE lifestyle — high engagement
      getMockReelAnalysis({ id: "reel_05" }), // Gaming — 42% watch, not liked
    ]);

    const gamingInterest = profile.interests.find((i) =>
      i.name.toLowerCase().includes("gaming")
    );
    const techInterest = profile.interests.find(
      (i) =>
        i.name.toLowerCase().includes("software") ||
        i.name.toLowerCase().includes("programming") ||
        i.name.toLowerCase().includes("engineering")
    );

    // Gaming must score lower than tech OR not appear at all (both valid outcomes)
    if (gamingInterest && techInterest) {
      assert.ok(
        techInterest.score > gamingInterest.score,
        `Tech (${techInterest.score}) must outscore gaming (${gamingInterest.score})`
      );
    } else {
      // If gaming does not appear in the profile, tech dominance is implicit — pass
      assert.ok(techInterest, "A tech interest must be present in the profile");
    }
  });
});

// ─── Test D: Anti-Hype Quality Validation ────────────────────────────────────
describe("Test D — Anti-Hype Quality Validation", () => {
  it('should REJECT: "10 AI Tools That Will GUARANTEE You a Job"', async () => {
    const result = await validateRecommendation({
      recommendation: {
        title: "10 AI Tools That Will GUARANTEE You a Job",
        description: "Guaranteed career success",
        category: "Career",
        reason: "AI tools",
      },
    });
    assert.strictEqual(result.passed, false, "Clickbait recommendation must be rejected");
  });

  it('should REJECT: salary-promise titles matching "₹50 LPA" pattern', async () => {
    const result = await validateRecommendation({
      recommendation: {
        title: "Learn This and Earn 50 LPA As a Developer",
        description: "Secret salary tips",
        category: "Career",
        reason: "salary hack",
      },
    });
    assert.strictEqual(result.passed, false, "Salary-bait recommendation must be rejected");
  });

  it("should APPROVE: a genuine, practical engineering recommendation", async () => {
    const result = await validateRecommendation({
      recommendation: {
        title: "How CI/CD Pipelines Work in Real Engineering Teams",
        description:
          "A practical walkthrough of continuous integration and deployment in production software systems.",
        category: "Career",
        reason: "Explains real software engineering workflows with evidence-based examples",
      },
    });
    assert.strictEqual(result.passed, true, "Genuine educational recommendation must be approved");
  });
});

// ─── Test E: Required Recommendation Output Structure ─────────────────────────
describe("Test E — Required Recommendation Output Structure", () => {
  const rec = getMockRecommendation({});

  it("result must contain all required top-level fields", () => {
    for (const field of ["currentReelContext", "interestDetected", "why", "recommendation", "confidence"]) {
      assert.ok(field in rec, `Missing required top-level field: ${field}`);
    }
  });

  it("interestDetected must have primary (string) and secondary (array) fields", () => {
    assert.ok("primary" in rec.interestDetected, "Missing: interestDetected.primary");
    assert.ok("secondary" in rec.interestDetected, "Missing: interestDetected.secondary");
    assert.strictEqual(typeof rec.interestDetected.primary, "string");
    assert.ok(Array.isArray(rec.interestDetected.secondary));
  });

  it("recommendation sub-object must have title, category, reason, difficulty", () => {
    for (const field of ["title", "category", "reason", "difficulty"]) {
      assert.ok(field in rec.recommendation, `Missing: recommendation.${field}`);
    }
  });

  it('"why" must be a non-empty array', () => {
    assert.ok(Array.isArray(rec.why), '"why" must be an array');
    assert.ok(rec.why.length > 0, '"why" must not be empty');
  });

  it("confidence must be High, Medium, or Low", () => {
    assert.ok(
      ["High", "Medium", "Low"].includes(rec.confidence),
      `confidence must be High/Medium/Low, got: "${rec.confidence}"`
    );
  });

  it("difficulty must be Beginner, Intermediate, or Advanced", () => {
    assert.ok(
      ["Beginner", "Intermediate", "Advanced"].includes(rec.recommendation.difficulty),
      `difficulty must be Beginner/Intermediate/Advanced, got: "${rec.recommendation.difficulty}"`
    );
  });
});
