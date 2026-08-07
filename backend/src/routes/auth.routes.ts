import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { authRateLimit } from "../middleware/rate-limit.middleware.js";
import { asyncHandler } from "../utils/async-handler.js";

export const authRouter = Router();

// Credential endpoints get a far stricter budget than the global limiter.
authRouter.post("/register", authRateLimit, asyncHandler(authController.register));
authRouter.post("/login", authRateLimit, asyncHandler(authController.login));
authRouter.post("/logout", authController.logout);
