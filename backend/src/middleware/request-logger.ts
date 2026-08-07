import type { RequestHandler } from "express";
import { logger } from "../logger.js";

/** Logs method, path, status, and duration once the response is flushed. */
export const requestLogger: RequestHandler = (request, response, next) => {
  const startedAt = process.hrtime.bigint();

  response.once("finish", () => {
    const ms = Number(process.hrtime.bigint() - startedAt) / 1_000_000;
    const line = `${request.method} ${request.originalUrl} ${response.statusCode} ${ms.toFixed(1)}ms`;
    if (response.statusCode >= 500) logger.error(line);
    else if (response.statusCode >= 400) logger.warn(line);
    else logger.info(line);
  });

  next();
};
