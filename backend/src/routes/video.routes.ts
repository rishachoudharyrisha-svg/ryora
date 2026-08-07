import { Router } from "express";
import { videoController } from "../controllers/video.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../utils/async-handler.js";

export const videoRouter = Router();

videoRouter.use(requireAuth);
videoRouter.get("/videos", asyncHandler(videoController.list));
videoRouter.patch("/videos/:id", asyncHandler(videoController.update));
videoRouter.delete("/videos/:id", asyncHandler(videoController.remove));
