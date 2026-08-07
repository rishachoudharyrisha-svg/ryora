import { userRepository } from "../repositories/index.js";
import { NotFoundError, UnprocessableEntityError } from "../errors.js";

export const CREDIT_EXHAUSTED_MESSAGE =
  "Your free generation has been used. Upgrade your plan to continue.";

/** Centralizes generation entitlements so future plan/payment providers do not affect generation logic. */
export const creditService = {
  /** Atomically reserves one credit before generation starts, so concurrent requests can't both pass on the last credit. */
  async reserve(userId: string) {
    const existing = await userRepository.findById(userId);
    if (!existing) throw new NotFoundError("User not found.");
    const user = await userRepository.decrementCredit(userId);
    if (!user) throw new UnprocessableEntityError(CREDIT_EXHAUSTED_MESSAGE);
    return user.credits;
  },
  /** Returns a reserved credit if generation fails after it was reserved. */
  async refund(userId: string) {
    return userRepository.incrementCredit(userId);
  },
};
