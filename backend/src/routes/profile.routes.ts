import { Router } from "express";
import { profileController } from "../controllers/profile.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../utils/async-handler.js";

export const profileRouter = Router();

profileRouter.use(requireAuth);
profileRouter.get("/profile", asyncHandler(profileController.show));
profileRouter.patch("/profile", asyncHandler(profileController.update));
