/**
 * Frontend API Service — Calls backend AI agent pipeline
 * In dev: Vite proxy forwards /api → localhost:3001
 * In production: VITE_API_URL must point to deployed backend
 */

const BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : "/api";


/**
 * Fetch all sample reels
 */
export async function fetchReels() {
  const res = await fetch(`${BASE_URL}/reels`);
  if (!res.ok) throw new Error("Failed to fetch reels");
  return res.json();
}

/**
 * Fetch the demo scenario reels
 */
export async function fetchDemoReels() {
  const res = await fetch(`${BASE_URL}/reels/demo`);
  if (!res.ok) throw new Error("Failed to fetch demo reels");
  return res.json();
}

/**
 * Run the full AI analysis pipeline
 * @param {string[]} reelIds - Reel IDs to analyze (empty = demo scenario)
 */
export async function analyzeReels(reelIds = []) {
  const res = await fetch(`${BASE_URL}/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reelIds }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Analysis failed");
  }
  return res.json();
}

/**
 * Check server health
 */
export async function checkHealth() {
  const res = await fetch(`${BASE_URL}/health`);
  return res.json();
}
