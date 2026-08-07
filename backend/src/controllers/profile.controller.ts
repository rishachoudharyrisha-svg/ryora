import type { Request, Response } from "express";
import { getUserProfile, updateUserProfile } from "../services/auth.service.js";
import { currentUserId } from "../utils/authenticated-user.js";
import { profileSchema } from "../validators/schemas.js";

export const profileController = {
  async show(request: Request, response: Response) {
    response.json({ user: await getUserProfile(currentUserId(request)) });
  },

  async update(request: Request, response: Response) {
    const payload = profileSchema.parse(request.body);
    response.json({ user: await updateUserProfile(currentUserId(request), payload) });
  },
};
