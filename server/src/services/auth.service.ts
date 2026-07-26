import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { userRepository } from "./repositories.js";
export type SafeUser = { id: string; name: string; email: string; avatarUrl?: string; createdAt: Date };
export const toSafeUser = (user: Awaited<ReturnType<typeof userRepository.findById>> & {}) => ({ id: user!.id, name: user!.name, email: user!.email, avatarUrl: user!.avatarUrl, createdAt: user!.createdAt });
export const issueToken = (userId: string) => jwt.sign({ sub: userId }, env.JWT_SECRET, { expiresIn: "7d" });
export async function registerUser(input: { name: string; email: string; password: string }) { if (await userRepository.findByEmail(input.email)) throw Object.assign(new Error("An account with that email already exists."), { status: 409 }); const user = await userRepository.create({ name: input.name, email: input.email.toLowerCase(), passwordHash: await bcrypt.hash(input.password, 12) }); return { user: toSafeUser(user), token: issueToken(user.id) }; }
export async function loginUser(input: { email: string; password: string }) { const user = await userRepository.findByEmail(input.email.toLowerCase()); if (!user || !(await bcrypt.compare(input.password, user.passwordHash))) throw Object.assign(new Error("Invalid email or password."), { status: 401 }); return { user: toSafeUser(user), token: issueToken(user.id) }; }
