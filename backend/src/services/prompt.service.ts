import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { env } from "../config/env.js";
import { BadGatewayError, UnprocessableEntityError } from "../errors.js";
import { logger } from "../logger.js";
import type { VideoStyle } from "../types/domain.js";

const safetySettings = [
  HarmCategory.HARM_CATEGORY_HARASSMENT,
  HarmCategory.HARM_CATEGORY_HATE_SPEECH,
  HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
  HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
].map((category) => ({ category, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE }));

/** Offline guard so local development still refuses clearly disallowed prompts. */
const locallyBlockedTerms =
  /\b(child sexual|sexual minor|graphic violence|self[- ]harm|suicide|terrorist attack)\b/i;

type PromptInput = {
  prompt: string;
  style: VideoStyle;
  duration: number;
  aspectRatio: string;
};

const localFallback = (input: PromptInput): string =>
  `${input.prompt}. Cinematic ${input.style} animation, expressive character detail, rich environment, ` +
  `gentle camera movement, atmospheric lighting, cohesive color palette, polished motion, ` +
  `balanced composition, ${input.duration}-second sequence in ${input.aspectRatio}.`;

const instruction = (input: PromptInput): string =>
  `Rewrite this as one safe, production-ready animated-video prompt. Preserve the request. ` +
  `Include character details, environment, camera movement, lighting, mood, motion, composition, ` +
  `animation quality, and a color palette. Style: ${input.style}. Duration: ${input.duration}s. ` +
  `Aspect ratio: ${input.aspectRatio}. User prompt: ${input.prompt}`;

/**
 * Expands a short user prompt into a directed one. Falls back to a
 * deterministic local template when no Gemini key is configured, so
 * development never depends on an external service.
 */
export async function enhancePrompt(input: PromptInput): Promise<string> {
  if (locallyBlockedTerms.test(input.prompt)) {
    throw new UnprocessableEntityError("This prompt cannot be processed due to safety requirements.");
  }

  if (!env.GEMINI_API_KEY) return localFallback(input);

  try {
    const client = new GoogleGenerativeAI(env.GEMINI_API_KEY);
    const model = client.getGenerativeModel({ model: env.GEMINI_MODEL, safetySettings });
    const result = await model.generateContent(instruction(input));
    const text = result.response.text().trim();
    if (!text) throw new BadGatewayError("Prompt enhancement returned no content.");
    return text;
  } catch (error) {
    if (error instanceof UnprocessableEntityError) throw error;
    // A blocked candidate surfaces as a thrown error from the SDK; treat it as
    // a safety rejection rather than an outage.
    const message = error instanceof Error ? error.message : "";
    if (/safety|blocked/i.test(message)) {
      throw new UnprocessableEntityError("This prompt cannot be processed due to safety requirements.");
    }
    logger.error("Gemini prompt enhancement failed; using local fallback.", message);
    return localFallback(input);
  }
}
