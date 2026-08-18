/**
 * Agent 1 — Reel Understanding Agent
 * Analyzes individual reels for semantic meaning, context, and educational/career value.
 * Does NOT rely on keywords alone — extracts semantic signals.
 */

import { callLLM } from "../services/aiService.js";
import { getMockReelAnalysis } from "../services/mockResponses.js";

const SYSTEM_PROMPT = `You are an expert AI agent specialized in analyzing short-form video content (Reels).

Your task is to perform DEEP SEMANTIC ANALYSIS of a Reel, going far beyond surface-level keywords.

Rules:
1. Do NOT perform keyword matching. Look for SEMANTIC MEANING and CONTEXT.
2. Understand the INTENT behind the content, not just its literal topic.
3. Assess educational value, career relevance, and technology relevance holistically.
4. Identify implicit signals — e.g., a "Java meme" is not just about Java, it signals programmer culture, developer experience, and tech career interest.
5. Extract semantic signals that can help build a user interest profile.

Return ONLY valid JSON matching this exact schema:
{
  "reelId": string,
  "topic": string,
  "context": string,
  "intent": string,
  "technologyRelevance": "Very Low" | "Low" | "Medium" | "High" | "Very High",
  "educationalValue": "Very Low" | "Low" | "Medium" | "High" | "Very High",
  "careerRelevance": "Very Low" | "Low" | "Medium" | "High" | "Very High",
  "entertainmentLevel": "Very Low" | "Low" | "Medium" | "High" | "Very High",
  "technicalConcepts": string[],
  "apparentUserInterest": string,
  "semanticSignals": string[]
}`;

/**
 * Analyze a single reel for semantic meaning
 * @param {object} reel - The reel object
 * @returns {Promise<object>} - Semantic analysis result
 */
export async function analyzeReel(reel) {
  try {
    const userPrompt = `Analyze this Reel:

Title: ${reel.title}
Caption: ${reel.caption || "N/A"}
Description: ${reel.description}
Category: ${reel.category}
Transcript: ${reel.transcript || "N/A"}
Watch Percentage: ${reel.watchPercentage}%
Liked: ${reel.liked}
Saved: ${reel.saved || false}

Perform semantic analysis. Remember: go beyond keywords. What does this content REALLY signal about the user?`;

    return await callLLM(SYSTEM_PROMPT, userPrompt);
  } catch (err) {
    if (err.message === "MOCK_PROVIDER") {
      return getMockReelAnalysis(reel);
    }
    console.error(`[ReelAnalyzer] Error analyzing ${reel.id}:`, err.message);
    // Fallback to mock on any LLM error
    return getMockReelAnalysis(reel);
  }
}

/**
 * Analyze multiple reels in batch
 * @param {object[]} reels - Array of reel objects
 * @returns {Promise<object[]>} - Array of analysis results
 */
export async function analyzeReels(reels) {
  const analyses = await Promise.all(reels.map(reel => analyzeReel(reel)));
  return analyses;
}
