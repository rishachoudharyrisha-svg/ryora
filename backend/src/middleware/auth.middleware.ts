import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { UnauthorizedError } from "../errors.js";

declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
  }
}

/** Verifies the bearer token and attaches the caller's id to the request. */
export function requireAuth(request: Request, _response: Response, next: NextFunction): void {
  const token = request.header("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) {
    next(new UnauthorizedError("Authentication required."));
    return;
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET);
    if (typeof payload === "string" || !payload.sub) {
      throw new UnauthorizedError("Malformed session token.");
    }
    request.userId = payload.sub;
    next();
  } catch {
    // Expired, tampered, and malformed tokens are all reported identically.
    next(new UnauthorizedError("Invalid or expired session."));
  }
}
