import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { UnauthorizedError, UnprocessableEntityError } from "../errors.js";
import { userRepository } from "../repositories/index.js";
import type { UserRecord } from "../types/domain.js";
import type { LoginInput, RegisterInput } from "../validators/schemas.js";

const BCRYPT_ROUNDS = 12;
const TOKEN_TTL = "7d";

export type SafeUser = Omit<UserRecord, "passwordHash">;

/** Strips the password hash so it can never leak through a response body. */
export const toSafeUser = ({ passwordHash: _passwordHash, ...user }: UserRecord): SafeUser => user;

export const issueToken = (userId: string): string =>
  jwt.sign({ sub: userId }, env.JWT_SECRET, { expiresIn: TOKEN_TTL });

export async function registerUser(input: RegisterInput) {
  const existing = await userRepository.findByEmail(input.email);
  if (existing) throw new UnprocessableEntityError("An account with that email already exists.");

  const user = await userRepository.create({
    name: input.name,
    email: input.email,
    passwordHash: await bcrypt.hash(input.password, BCRYPT_ROUNDS),
    credits: 1,
  });

  return { user: toSafeUser(user), token: issueToken(user.id) };
}

export async function loginUser(input: LoginInput) {
  const user = await userRepository.findByEmail(input.email);
  // Identical error for unknown email and wrong password, so responses cannot
  // be used to enumerate which accounts exist.
  if (!user || !(await bcrypt.compare(input.password, user.passwordHash))) {
    throw new UnauthorizedError("Invalid email or password.");
  }
  return { user: toSafeUser(user), token: issueToken(user.id) };
}

export async function getUserProfile(userId: string): Promise<SafeUser> {
  const user = await userRepository.findById(userId);
  if (!user) throw new UnauthorizedError("Account no longer exists.");
  return toSafeUser(user);
}

export async function updateUserProfile(
  userId: string,
  input: { name: string; avatarUrl?: string },
): Promise<SafeUser> {
  const user = await userRepository.update(userId, input);
  if (!user) throw new UnauthorizedError("Account no longer exists.");
  return toSafeUser(user);
}
