/**
 * TechScroll AI — Express Server Entry Point
 */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import apiRouter from "./routes/api.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Routes
app.use("/api", apiRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("[Server Error]", err);
  res.status(500).json({ error: "Internal server error", message: err.message });
});

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
