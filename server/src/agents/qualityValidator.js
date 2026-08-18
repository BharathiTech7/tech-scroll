/**
 * Agent 4 — Quality Validator / Anti-Hype Filter
 * Validates recommendations for quality, accuracy, and educational value.
 * Rejects clickbait, exaggerated career promises, and misleading content.
 */

import { callLLM } from "../services/aiService.js";
import { getMockQualityValidation } from "../services/mockResponses.js";

const SYSTEM_PROMPT = `You are an AI quality assurance agent for a technology education platform targeting students.

Your task is to validate whether a recommended Reel topic meets quality and honesty standards.

REJECT content that:
- Makes exaggerated claims: "This ONE trick will make you a 10x developer"
- Guarantees outcomes: "Learn this and get ₹50 LPA guaranteed"
- Uses fear tactics: "AI will replace you unless you do this NOW"
- Is clickbait: "You won't BELIEVE what this developer discovered"
- Makes misleading career promises: "Become a senior dev in 30 days"
- Promotes generic AI hype: "10 AI tools that will change everything"
- Has unsupported claims: "This framework is 1000x faster"

APPROVE content that:
- Provides practical tutorials with real concepts
- Explains real engineering workflows
- Gives genuine career guidance with realistic expectations
- Shows technical demonstrations with substance
- Covers industry practices backed by evidence
- Teaches specific, actionable skills

Return ONLY valid JSON matching this exact schema:
{
  "passed": boolean,
  "qualityScore": number,
  "checks": {
    "exaggeratedClaims": boolean,
    "guaranteedOutcomes": boolean,
    "fearBasedContent": boolean,
    "misleadingCareerPromises": boolean,
    "clickbait": boolean,
    "genericAIHype": boolean,
    "unsupportedClaims": boolean
  },
  "positiveSignals": {
    "practicalContent": boolean,
    "realEngineeringConcepts": boolean,
    "industryExplanation": boolean,
    "evidenceBased": boolean,
    "careerGuidance": boolean
  },
  "verdict": string,
  "explanation": string
}`;

// Heuristic checks run BEFORE calling the LLM (fast, no API cost)
const REJECTION_PATTERNS = [
  /guarantee|guaranteed/i,
  /\d+\s*lpa/i,
  /replace every/i,
  /won'?t believe/i,
  /one (weird |simple )?(trick|secret|hack)/i,
  /become .* in \d+ days/i,
  /\d+x developer/i,
  /change everything/i,
  /\d+ (ai )?tools that will/i,
];

function heuristicCheck(title) {
  const flagged = REJECTION_PATTERNS.filter(p => p.test(title));
  return {
    flagged: flagged.length > 0,
    patterns: flagged.map(p => p.toString())
  };
}

/**
 * Validate a recommendation for quality and anti-hype compliance
 * @param {object} recommendation - The recommendation from Agent 3
 * @returns {Promise<object>} - Validation result
 */
export async function validateRecommendation(recommendation) {
  const title = recommendation.recommendation?.title || "";

  // Run fast heuristic check first
  const heuristic = heuristicCheck(title);
  if (heuristic.flagged) {
    return {
      passed: false,
      qualityScore: 0.1,
      checks: {
        exaggeratedClaims: true,
        guaranteedOutcomes: heuristic.patterns.some(p => p.includes("guarantee")),
        fearBasedContent: false,
        misleadingCareerPromises: heuristic.patterns.some(p => p.includes("lpa")),
        clickbait: true,
        genericAIHype: heuristic.patterns.some(p => p.includes("ai tools")),
        unsupportedClaims: false
      },
      positiveSignals: {
        practicalContent: false,
        realEngineeringConcepts: false,
        industryExplanation: false,
        evidenceBased: false,
        careerGuidance: false
      },
      verdict: "REJECTED — Heuristic patterns detected: " + heuristic.patterns.join(", "),
      explanation: "Content matched known clickbait/hype patterns and was rejected before LLM evaluation."
    };
  }

  try {
    const userPrompt = `Validate this Reel recommendation for quality and educational honesty:

Title: "${title}"
Description: "${recommendation.recommendation?.description || ""}"
Category: ${recommendation.recommendation?.category || ""}
Reason given: "${recommendation.recommendation?.reason || ""}"

Is this suitable for a technology education platform? Does it avoid hype, clickbait, and misleading claims?`;

    return await callLLM(SYSTEM_PROMPT, userPrompt);
  } catch (err) {
    if (err.message === "MOCK_PROVIDER") {
      return getMockQualityValidation(recommendation);
    }
    console.error("[QualityValidator] Error:", err.message);
    return getMockQualityValidation(recommendation);
  }
}
