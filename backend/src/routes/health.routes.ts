import { Router } from "express";
import mongoose from "mongoose";

export const healthRouter = Router();

healthRouter.get("/health", (_request, response) => {
  response.status(200).json({
    status: "ok",
    service: "ryora-api",
    database: mongoose.connection.readyState === 1 ? "connected" : "in-memory",
    timestamp: new Date().toISOString(),
  });
});
