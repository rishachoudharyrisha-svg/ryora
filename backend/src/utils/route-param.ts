import type { Request } from "express";
import { BadRequestError } from "../errors.js";

/**
 * Express types route params as string | string[]. This narrows to a single
 * value so controllers never cast, and rejects the repeated-param form.
 */
export function routeParam(request: Request, name: string): string {
  const value = request.params[name];
  if (typeof value !== "string" || value.length === 0) {
    throw new BadRequestError(`Missing or invalid "${name}" parameter.`);
  }
  return value;
}
