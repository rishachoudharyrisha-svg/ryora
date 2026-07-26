import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { env } from "../config/env.js";
import type { VideoStyle } from "../types/domain.js";

const safetySettings = [HarmCategory.HARM_CATEGORY_HARASSMENT, HarmCategory.HARM_CATEGORY_HATE_SPEECH, HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT].map((category) => ({ category, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE }));
const localBlockedTerms = /\b(child sexual|sexual minor|graphic violence|self[- ]harm|suicide|terrorist attack)\b/i;

export async function enhancePrompt(input: { prompt: string; style: VideoStyle; duration: number; aspectRatio: string }): Promise<string> {
  if (localBlockedTerms.test(input.prompt)) throw Object.assign(new Error("This prompt cannot be processed due to safety requirements."), { status: 422 });
  if (!env.GEMINI_API_KEY) return `${input.prompt}. Cinematic ${input.style} animation, expressive character detail, rich environment, gentle camera movement, atmospheric lighting, cohesive color palette, polished motion, balanced composition, ${input.duration}-second sequence in ${input.aspectRatio}.`;
  const client = new GoogleGenerativeAI(env.GEMINI_API_KEY);
  const model = client.getGenerativeModel({ model: env.GEMINI_MODEL, safetySettings });
  const result = await model.generateContent(`Rewrite this as one safe, production-ready animated-video prompt. Preserve the request. Include character details, environment, camera movement, lighting, mood, motion, composition, animation quality, and a color palette. Style: ${input.style}. Duration: ${input.duration}s. Aspect ratio: ${input.aspectRatio}. User prompt: ${input.prompt}`);
  const text = result.response.text().trim();
  if (!text) throw Object.assign(new Error("Prompt enhancement returned no content."), { status: 502 });
  return text;
}
