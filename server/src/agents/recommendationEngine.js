/**
 * Agent 3 — Recommendation Engine
 * Generates technology-related Reel recommendations based on the inferred interest profile.
 * Recommendations are semantic, engaging, educational, and NOT keyword-matched.
 */

import { callLLM } from "../services/aiService.js";
import { getMockRecommendation } from "../services/mockResponses.js";

const SYSTEM_PROMPT = `You are an expert AI recommendation agent for a technology education platform.

Your task is to generate ONE high-quality technology Reel recommendation based on a student's inferred interest profile.

CRITICAL RULES:
1. Do NOT recommend content that simply repeats the keywords from watched reels.
   - BAD: User watched Java meme → Recommend "Another Java Tutorial"
   - GOOD: User watched Java meme + SE lifestyle + coding interview → Recommend "What Happens When Your Code Goes to Production?"
2. Recommendations must connect to the BROADER inferred interest, not the surface keyword.
3. Recommendations must have genuine educational or career value for technology students.
4. Pick from these categories: AI, DSA, Java, HLD, Cybersecurity, Cloud, Hardware, Career, Web Development, Backend, DevOps, System Design, Databases, Programming, Other
5. The recommendation title should sound like a real, engaging Reel title (not clickbait).
6. Also generate ONE example of a recommendation you are REJECTING and why (to demonstrate quality filtering).
7. Explain the semantic connection clearly — this explanation will be shown to the user.

Return ONLY valid JSON matching this exact schema:
{
  "currentReelContext": string,
  "interestDetected": {
    "primary": string,
    "secondary": string[],
    "avoidedShallowMatch": string
  },
  "why": string[],
  "recommendation": {
    "title": string,
    "description": string,
    "category": string,
    "subcategory": string,
    "reason": string,
    "difficulty": "Beginner" | "Intermediate" | "Advanced",
    "educationalValue": "Low" | "Medium" | "High" | "Very High",
    "qualityScore": number,
    "tags": string[]
  },
  "rejectedRecommendation": {
    "title": string,
    "rejectionReason": string
  },
  "confidence": "High" | "Medium" | "Low",
  "shallowAlternativeAvoided": string
}`;

/**
 * Generate a recommendation based on the user's interest profile
 * @param {object} interestProfile - Output from Agent 2
 * @param {object[]} watchedReels - Reels the user already interacted with (to avoid repetition)
 * @returns {Promise<object>} - Recommendation object
 */
export async function generateRecommendation(interestProfile, watchedReels = []) {
  try {
    const watchedTitles = watchedReels.map(r => r.title).join(", ");

    const userPrompt = `Generate a technology Reel recommendation based on this student's interest profile.

Interest Profile:
${JSON.stringify(interestProfile, null, 2)}

Already watched reels (do not repeat these):
${watchedTitles || "None"}

Generate ONE high-quality recommendation that:
1. Connects to the BROADER inferred interest (not a surface keyword)
2. Has genuine educational value for a technology student
3. Is engaging and would perform well as a short-form video
4. Is NOT clickbait or exaggerated

Also show ONE rejected recommendation example with reason.`;

    return await callLLM(SYSTEM_PROMPT, userPrompt);
  } catch (err) {
    if (err.message === "MOCK_PROVIDER") {
      return getMockRecommendation(interestProfile);
    }
    console.error("[RecommendationEngine] Error:", err.message);
    return getMockRecommendation(interestProfile);
  }
}
