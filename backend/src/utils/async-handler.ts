import type { NextFunction, Request, RequestHandler, Response } from "express";

/**
 * Wraps an async handler so rejected promises reach the error middleware.
 * Without this every controller needs its own try/catch purely to call next(error).
 */
export const asyncHandler =
  (handler: (request: Request, response: Response, next: NextFunction) => Promise<unknown>): RequestHandler =>
  (request, response, next) => {
    handler(request, response, next).catch(next);
  };
