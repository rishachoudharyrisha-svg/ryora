import type { ErrorRequestHandler } from "express";
import { env } from "../config/env.js";
import { ZodError } from "zod";
import { AppError } from "../errors.js";
import { logger } from "../logger.js";

export const errorHandler: ErrorRequestHandler = (error, _request, response, next) => {
  void next;
  if (error instanceof ZodError) {
    return response.status(400).json({ error: { message: "Invalid request data", fields: error.flatten().fieldErrors } });
  }
  if (error instanceof AppError) {
    return response.status(error.status).json({ error: { message: error.message } });
  }
  const status = typeof (error as any).status === "number" ? (error as any).status : 500;
  if (status >= 500) logger.error(error.message, error);
  response.status(status).json({ error: { message: status >= 500 && env.NODE_ENV === "production" ? "Internal server error" : error.message } });
};
