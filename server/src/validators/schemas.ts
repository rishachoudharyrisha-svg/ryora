import { z } from "zod";
export const registerSchema = z.object({ name: z.string().trim().min(2).max(80), email: z.string().trim().email(), password: z.string().min(8).max(128) });
export const loginSchema = registerSchema.pick({ email: true, password: true });
export const profileSchema = z.object({ name: z.string().trim().min(2).max(80), avatarUrl: z.string().url().optional() });
export const generateSchema = z.object({ prompt: z.string().trim().min(10).max(1_000), style: z.enum(["Pixar", "Disney", "Anime", "Cartoon", "Studio Ghibli", "Clay Animation", "Minecraft", "Lego", "Comic", "Cyberpunk", "Realistic 3D"]), duration: z.union([z.literal(5), z.literal(10), z.literal(15)]), aspectRatio: z.enum(["16:9", "9:16", "1:1"]) });
