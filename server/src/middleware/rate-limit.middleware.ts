import type { RequestHandler } from "express";
const buckets = new Map<string, { count: number; resetAt: number }>();
export function memoryRateLimit(limit = 60, windowMs = 60_000): RequestHandler { return (request, response, next) => { const key = request.ip ?? "unknown"; const now = Date.now(); const bucket = buckets.get(key); if (!bucket || bucket.resetAt < now) { buckets.set(key, { count: 1, resetAt: now + windowMs }); return next(); } if (++bucket.count > limit) return response.status(429).json({ error: { message: "Too many requests. Please try again shortly." } }); next(); }; }
