import { Router } from "express";
import { loginUser, registerUser } from "../services/auth.service.js";
import { loginSchema, registerSchema } from "../validators/schemas.js";
export const authRouter = Router();
authRouter.post("/register", async (request, response, next) => { try { const payload = registerSchema.parse(request.body); response.status(201).json(await registerUser(payload)); } catch (error) { next(error); } });
authRouter.post("/login", async (request, response, next) => { try { const payload = loginSchema.parse(request.body); response.json(await loginUser(payload)); } catch (error) { next(error); } });
authRouter.post("/logout", (_request, response) => response.status(204).end());
