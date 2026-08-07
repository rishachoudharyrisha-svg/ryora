import cors from "cors";
import express from "express";
import helmet from "helmet";
import { env } from "./config/env.js";
import { NotFoundError } from "./errors.js";
import { errorHandler } from "./middleware/error-handler.js";
import { globalRateLimit } from "./middleware/rate-limit.middleware.js";
import { requestLogger } from "./middleware/request-logger.js";
import { apiRouter } from "./routes/index.js";

export const app = express();

app.disable("x-powered-by");
// Required for correct client IPs (and therefore rate limiting) behind a proxy.
app.set("trust proxy", 1);

app.use(helmet());
app.use(cors({ origin: env.CLIENT_ORIGIN, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(requestLogger);
app.use(globalRateLimit);

app.use("/api", apiRouter);

app.use((request, _response, next) => {
  next(new NotFoundError(`Route not found: ${request.method} ${request.originalUrl}`));
});
app.use(errorHandler);
