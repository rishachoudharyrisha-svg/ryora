import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
declare module "express-serve-static-core" { interface Request { userId?: string } }
export function requireAuth(request: Request, _response: Response, next: NextFunction) { const token = request.header("authorization")?.replace(/^Bearer\s+/i, ""); if (!token) return next(Object.assign(new Error("Authentication required."), { status: 401 })); try { const payload = jwt.verify(token, env.JWT_SECRET); if (typeof payload === "string" || !payload.sub) throw new Error(); request.userId = payload.sub; next(); } catch { next(Object.assign(new Error("Invalid or expired session."), { status: 401 })); } }
