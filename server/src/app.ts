import cors from "cors";
import express from "express";
import helmet from "helmet";
import { env } from "./config/env.js";
import { errorHandler } from "./middleware/error-handler.js";
import { healthRouter } from "./routes/health.routes.js";
import { authRouter } from "./routes/auth.routes.js";
import { generationRouter } from "./routes/generation.routes.js";
import { profileRouter } from "./routes/profile.routes.js";
import { videoRouter } from "./routes/video.routes.js";
import { memoryRateLimit } from "./middleware/rate-limit.middleware.js";

export const app = express();

app.disable("x-powered-by");
app.use(helmet());
app.use(cors({ origin: env.CLIENT_ORIGIN, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(memoryRateLimit());
app.use("/api", healthRouter);
app.use("/api/auth", authRouter);
app.use("/api", profileRouter, generationRouter, videoRouter);
app.use((_request, response) => response.status(404).json({ error: { message: "Route not found" } }));
app.use(errorHandler);
