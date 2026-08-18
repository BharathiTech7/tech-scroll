/**
 * TechScroll AI — API Integration Tests (Test F)
 * Uses Node.js built-in test runner + native fetch (Node 18+).
 * Imports the Express app directly — no external test server needed.
 */

import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";

// Import Express app (dotenv.config() is called inside app.js — AI_PROVIDER=mock)
const { default: app } = await import("../src/app.js");

const TEST_PORT = 3099; // Isolated port — does not conflict with the dev server
let server;

// ─── Test F: API Endpoints ────────────────────────────────────────────────────
describe("Test F — API Health & Endpoints", () => {
  before(
    () =>
      new Promise((resolve) => {
        server = app.listen(TEST_PORT, resolve);
      })
  );

  after(
    () =>
      new Promise((resolve) => {
        server.close(resolve);
      })
  );

  it("GET /api/health should return 200 with status: ok", async () => {
    const res = await fetch(`http://localhost:${TEST_PORT}/api/health`);
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(body.status, "ok");
    assert.ok("provider" in body, "Response must include provider field");
    assert.ok("timestamp" in body, "Response must include timestamp field");
  });

  it("GET /api/reels should return exactly 12 sample reels", async () => {
    const res = await fetch(`http://localhost:${TEST_PORT}/api/reels`);
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.ok(Array.isArray(body.reels), "reels must be an array");
    assert.strictEqual(body.reels.length, 12, "Must return exactly 12 sample reels");
  });

  it("GET /api/reels/demo should return the hackathon demo scenario reels", async () => {
    const res = await fetch(`http://localhost:${TEST_PORT}/api/reels/demo`);
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.ok(Array.isArray(body.reels), "demo reels must be an array");
    assert.ok(body.reels.length > 0, "Demo reels must not be empty");
  });

  it("POST /api/analyze with Java trap reels should return successful analysis", async () => {
    const res = await fetch(`http://localhost:${TEST_PORT}/api/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reelIds: ["reel_01", "reel_02", "reel_03", "reel_04"],
      }),
    });
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(body.success, true);
    assert.ok("interestProfile" in body, "Response must contain interestProfile");
    assert.ok("recommendation" in body, "Response must contain recommendation");
    assert.ok("validation" in body, "Response must contain validation");
    assert.strictEqual(body.validation.passed, true, "Quality validation must pass");
  });

  it("POST /api/analyze with empty body should use demo reels and succeed", async () => {
    const res = await fetch(`http://localhost:${TEST_PORT}/api/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(body.success, true);
  });

  it("GET unknown route should return 404", async () => {
    const res = await fetch(`http://localhost:${TEST_PORT}/api/nonexistent`);
    assert.strictEqual(res.status, 404);
  });
});
