import type { Request } from "express";
import { UnauthorizedError } from "../errors.js";

/**
 * Reads the id set by requireAuth. Centralised so controllers never resort to
 * a non-null assertion on request.userId.
 */
export function currentUserId(request: Request): string {
  if (!request.userId) throw new UnauthorizedError("Authentication required.");
  return request.userId;
}
