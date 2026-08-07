import type { RequestHandler } from "express";
import { TooManyRequestsError } from "../errors.js";

type Bucket = { count: number; resetAt: number };

/**
 * Fixed-window limiter held in process memory. Adequate for a single instance;
 * a multi-instance deployment should swap this for a Redis-backed store,
 * which is why each limiter owns its own bucket map behind one interface.
 */
export function memoryRateLimit(options: {
  limit: number;
  windowMs: number;
  scope: string;
  message?: string;
}): RequestHandler {
  const { limit, windowMs, scope, message } = options;
  const buckets = new Map<string, Bucket>();

  // Prevents unbounded growth from one-off IPs; unref so it never holds the
  // process open during shutdown.
  const sweeper = setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of buckets) {
      if (bucket.resetAt < now) buckets.delete(key);
    }
  }, windowMs);
  sweeper.unref();

  return (request, _response, next) => {
    // Authenticated callers are limited per account, anonymous ones per IP.
    const key = `${scope}:${request.userId ?? request.ip ?? "unknown"}`;
    const now = Date.now();
    const bucket = buckets.get(key);

    if (!bucket || bucket.resetAt < now) {
      buckets.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }

    bucket.count += 1;
    if (bucket.count > limit) {
      return next(new TooManyRequestsError(message));
    }
    next();
  };
}

/** Broad ceiling applied to every request. */
export const globalRateLimit = memoryRateLimit({
  limit: 120,
  windowMs: 60_000,
  scope: "global",
});

/** Tight budget on credential endpoints to blunt brute-force attempts. */
export const authRateLimit = memoryRateLimit({
  limit: 8,
  windowMs: 15 * 60_000,
  scope: "auth",
  message: "Too many attempts. Please try again in a few minutes.",
});

/** Generation is the expensive path; keep it well below the global ceiling. */
export const generateRateLimit = memoryRateLimit({
  limit: 10,
  windowMs: 60_000,
  scope: "generate",
  message: "You are generating too quickly. Please wait a moment.",
});
