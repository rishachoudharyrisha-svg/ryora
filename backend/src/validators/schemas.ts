import { z } from "zod";
import { ASPECT_RATIOS, DURATIONS, VIDEO_STYLES } from "../types/domain.js";

const email = z.string().trim().toLowerCase().email();
const password = z.string().min(8).max(128);
const name = z.string().trim().min(2).max(80);

export const registerSchema = z.object({ name, email, password });

export const loginSchema = z.object({ email, password });

export const profileSchema = z.object({
  name,
  avatarUrl: z.string().url().optional(),
});

export const generateSchema = z.object({
  prompt: z.string().trim().min(10).max(1_000),
  style: z.enum(VIDEO_STYLES),
  duration: z
    .number()
    .refine((value): value is (typeof DURATIONS)[number] => DURATIONS.includes(value as never), {
      message: `Duration must be one of: ${DURATIONS.join(", ")}`,
    }),
  aspectRatio: z.enum(ASPECT_RATIOS),
});

export const updateVideoSchema = z
  .object({
    title: z.string().trim().min(1).max(120).optional(),
    isFavorite: z.boolean().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: "Provide at least one field to update.",
  });

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(12),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
export type GenerateInput = z.infer<typeof generateSchema>;
export type UpdateVideoInput = z.infer<typeof updateVideoSchema>;
