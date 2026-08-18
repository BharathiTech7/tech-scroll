/**
 * TechScroll AI — Express Server Entry Point
 * App setup lives in app.js (importable by tests without starting the server).
 */

import app from "./app.js";

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`\n🚀 TechScroll AI Server running on http://localhost:${PORT}`);
  console.log(`📡 AI Provider: ${process.env.AI_PROVIDER || "mock (set AI_PROVIDER in .env)"}`);
  console.log(`🌐 CORS Origin: ${process.env.CORS_ORIGIN || "http://localhost:5173"}`);
  console.log(`\nEndpoints:`);
  console.log(`  GET  /api/health`);
  console.log(`  GET  /api/reels`);
  console.log(`  GET  /api/reels/demo`);
  console.log(`  POST /api/analyze\n`);
});

