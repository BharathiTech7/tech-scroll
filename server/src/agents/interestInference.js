/**
 * Agent 2 — Interest Inference Agent
 * Analyzes ALL reel interactions together to infer broader, semantic user interests.
 * Distinguishes explicit vs implicit interests. Uses multi-reel reasoning.
 * CRITICAL: Does NOT assume one reel = one interest. Finds patterns across interactions.
 */

import { callLLM } from "../services/aiService.js";
import { getMockInterestInference } from "../services/mockResponses.js";

const SYSTEM_PROMPT = `You are an expert AI agent specialized in inferring user interests from their content interaction history.

Your task is to analyze MULTIPLE reel interactions together and infer BROADER semantic interests.

CRITICAL RULES:
1. Do NOT use keyword matching. Do NOT say "user liked a Java reel, so user likes Java."
2. Instead, look for PATTERNS across multiple interactions. Find the COMMON THREAD.
3. Example: Java meme + SE lifestyle + coding interview + laptop comparison = Software Engineering (broader interest)
4. Distinguish between:
   - Explicit interest: directly stated (e.g., watching multiple programming tutorials)
   - Implicit interest: inferred from patterns (e.g., memes + lifestyle + interviews = developer career interest)
5. Use watch percentage, likes, saves, and shares to weight the interest score.
6. Interest score formula concept: semantic relevance × watch_completion × engagement × consistency × recency
7. Score range: 0.0 to 1.0
8. Report confidence honestly: only "High" if multiple strong signals exist
9. Flag interests that appear to be temporary/accidental (e.g., 38% watch, not liked = weak signal)

Return ONLY valid JSON matching this exact schema:
{
  "primaryInterest": {
    "name": string,
    "score": number,
    "confidence": "High" | "Medium" | "Low",
    "evidence": string[]
  },
  "interests": [
    {
      "name": string,
      "score": number,
      "confidence": "High" | "Medium" | "Low",
      "type": "Primary" | "Explicit" | "Implicit" | "Emerging" | "Secondary" | "Weak",
      "emoji": string,
      "evidence": string[]
    }
  ],
  "interestPattern": string,
  "dominantDomain": string,
  "avoidRecommending": string[]
}`;

/**
 * Infer user interests from multiple reel analyses and raw reels
 * @param {object[]} reelAnalyses - Output from Agent 1 for each reel
 * @param {object[]} rawReels - Original reel objects (for engagement data)
 * @returns {Promise<object>} - Interest profile
 */
export async function inferInterests(reelAnalyses, rawReels) {
  try {
    // Build enriched context with engagement data
    const enrichedData = reelAnalyses.map((analysis, idx) => {
      const reel = rawReels[idx] || {};
      return {
        ...analysis,
        watchPercentage: reel.watchPercentage,
        liked: reel.liked,
        saved: reel.saved,
        shares: reel.shares
      };
    });

    const userPrompt = `Here are ${enrichedData.length} reel interactions from a student. Analyze them TOGETHER to infer broader interests.

DO NOT match individual keywords. Find the semantic PATTERN across all interactions.

Reel Analyses:
${JSON.stringify(enrichedData)}

Remember: A Java meme + software engineer lifestyle + coding interview + laptop comparison together signal SOFTWARE ENGINEERING — not just "Java".

Infer the student's genuine interests with confidence scores.`;

    return await callLLM(SYSTEM_PROMPT, userPrompt);
  } catch (err) {
    if (err.message === "MOCK_PROVIDER") {
      return getMockInterestInference(reelAnalyses);
    }
    console.error("[InterestInference] Error:", err.message);
    return getMockInterestInference(reelAnalyses);
  }
}
