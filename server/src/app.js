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
app.use(express.json());

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

// Error handler
app.use((err, req, res, next) => {
  console.error("[Server Error]", err);
  res.status(500).json({ error: "Internal server error", message: err.message });
});

export default app;
