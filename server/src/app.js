/**
 * server/src/app.js
 * Express application setup — exported for testability.
 * server/src/index.js imports this and calls app.listen().
 */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import apiRouter from "./routes/api.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
// Limit request body to 10 KB to prevent payload-based DoS
app.use(express.json({ limit: "10kb" }));

// Security headers
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("X-XSS-Protection", "0"); // Disabled in favour of CSP; 0 is the modern recommendation
  next();
});

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

app.use("/api", apiRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler — log full error server-side; never expose internals to clients
app.use((err, req, res, next) => {
  console.error("[Server Error]", err);
  res.status(500).json({ error: "Internal server error" });
});

export default app;
