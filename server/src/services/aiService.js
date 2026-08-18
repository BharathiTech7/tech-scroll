/**
 * AI Service Layer — Abstracts LLM provider (Gemini / OpenAI / Mock)
 * Provider is configured via AI_PROVIDER env variable
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";

const provider = process.env.AI_PROVIDER || "mock";

// Initialize clients lazily
let geminiClient = null;
let openaiClient = null;

function getGeminiClient() {
  if (!geminiClient) {
    geminiClient = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  return geminiClient;
}

function getOpenAIClient() {
  if (!openaiClient) {
    openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openaiClient;
}

/**
 * Call the configured LLM with a prompt and return parsed JSON
 * @param {string} systemPrompt - System/role instructions
 * @param {string} userPrompt - The actual request
 * @returns {Promise<object>} - Parsed JSON response
 */
export async function callLLM(systemPrompt, userPrompt) {
  if (provider === "gemini") {
    return callGemini(systemPrompt, userPrompt);
  } else if (provider === "openai") {
    return callOpenAI(systemPrompt, userPrompt);
  } else {
    // mock provider — handled per-agent in mockResponses.js
    throw new Error("MOCK_PROVIDER");
  }
}

async function callGemini(systemPrompt, userPrompt) {
  const client = getGeminiClient();
  const model = client.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: systemPrompt,
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.7,
      maxOutputTokens: 2048,
    },
  });

  const result = await model.generateContent(userPrompt);
  const text = result.response.text();
  return JSON.parse(text);
}

async function callOpenAI(systemPrompt, userPrompt) {
  const client = getOpenAIClient();
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    response_format: { type: "json_object" },
    temperature: 0.7,
    max_tokens: 2048,
  });
  return JSON.parse(response.choices[0].message.content);
}
