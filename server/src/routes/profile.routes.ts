import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { toSafeUser } from "../services/auth.service.js";
import { userRepository } from "../services/repositories.js";
import { profileSchema } from "../validators/schemas.js";
export const profileRouter = Router();
profileRouter.use(requireAuth);
profileRouter.get("/profile", async (request, response, next) => {
  try {
    const user = await userRepository.findById(request.userId!);
    if (!user)
      throw Object.assign(new Error("User not found."), { status: 404 });
    response.json({ user: toSafeUser(user) });
  } catch (error) {
    next(error);
  }
});
profileRouter.patch("/profile", async (request, response, next) => {
  try {
    const user = await userRepository.update(
      request.userId!,
      profileSchema.parse(request.body),
    );
    if (!user)
      throw Object.assign(new Error("User not found."), { status: 404 });
    response.json({ user: toSafeUser(user) });
  } catch (error) {
    next(error);
  }
});
