import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().min(1).max(65_535).default(4000),
  CLIENT_ORIGIN: z.string().url().default("http://localhost:5173"),
  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),
  MONGODB_URI: z.string().url().optional(),
  GEMINI_API_KEY: z.string().min(1).optional(),
  GEMINI_MODEL: z.string().default("gemini-2.5-flash"),
  VIDEO_PROVIDER: z.enum(["local"]).default("local"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment configuration:", parsed.error.flatten().fieldErrors);
  throw new Error("Invalid environment configuration");
}

if (parsed.data.NODE_ENV === "production" && (!parsed.data.MONGODB_URI || !parsed.data.GEMINI_API_KEY)) {
  throw new Error("MONGODB_URI and GEMINI_API_KEY are required in production");
}

export const env = parsed.data;
