import type { Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth.service.js";
import { loginSchema, registerSchema } from "../validators/schemas.js";

export const authController = {
  async register(request: Request, response: Response) {
    const payload = registerSchema.parse(request.body);
    response.status(201).json(await registerUser(payload));
  },

  async login(request: Request, response: Response) {
    const payload = loginSchema.parse(request.body);
    response.json(await loginUser(payload));
  },

  /**
   * Tokens are stateless, so the server has nothing to revoke here; the client
   * discards it. Kept as an endpoint so a future refresh-token store can
   * invalidate server-side without changing the frontend contract.
   */
  logout(_request: Request, response: Response) {
    response.status(204).end();
  },
};
