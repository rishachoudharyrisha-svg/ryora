import { userRepository } from "./repositories.js";

export const CREDIT_EXHAUSTED_MESSAGE =
  "Your free generation has been used. Upgrade your plan to continue.";

const creditExhausted = () =>
  Object.assign(new Error(CREDIT_EXHAUSTED_MESSAGE), { status: 403 });

/** Centralizes generation entitlements so future plan/payment providers do not affect generation logic. */
export const creditService = {
  async assertAvailable(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user)
      throw Object.assign(new Error("User not found."), { status: 404 });
    if (user.credits <= 0) throw creditExhausted();
    return user.credits;
  },
  async consumeAfterSuccessfulGeneration(userId: string) {
    const user = await userRepository.decrementCredit(userId);
    if (!user) throw creditExhausted();
    return user.credits;
  },
};
