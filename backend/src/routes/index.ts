import { Router } from "express";
import { authRouter } from "./auth.routes.js";
import { generationRouter } from "./generation.routes.js";
import { healthRouter } from "./health.routes.js";
import { profileRouter } from "./profile.routes.js";
import { videoRouter } from "./video.routes.js";

/** Single mount point for the API surface, so app.ts stays free of route detail. */
export const apiRouter = Router();

apiRouter.use(healthRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use(profileRouter);
apiRouter.use(videoRouter);
apiRouter.use(generationRouter);
