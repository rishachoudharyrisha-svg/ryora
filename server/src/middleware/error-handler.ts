import type { ErrorRequestHandler } from "express";
import { env } from "../config/env.js";
import { ZodError } from "zod";

export const errorHandler: ErrorRequestHandler = (error, _request, response, next) => {
  void next;
  if (error instanceof ZodError) return response.status(400).json({ error: { message: "Invalid request data", fields: error.flatten().fieldErrors } });
  const status = typeof error.status === "number" ? error.status : 500;
  if (status >= 500) console.error(error);
  response.status(status).json({ error: { message: status >= 500 && env.NODE_ENV === "production" ? "Internal server error" : error.message } });
};
