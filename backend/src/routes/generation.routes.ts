import { Router } from "express";
import { generationController } from "../controllers/generation.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { generateRateLimit } from "../middleware/rate-limit.middleware.js";
import { asyncHandler } from "../utils/async-handler.js";

export const generationRouter = Router();

generationRouter.use(requireAuth);
generationRouter.post("/generate", generateRateLimit, asyncHandler(generationController.create));
generationRouter.get("/generations/:id", asyncHandler(generationController.show));
generationRouter.get("/history", asyncHandler(generationController.history));
