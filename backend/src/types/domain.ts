/**
 * Single source of truth for the domain enums. The Zod validators and the
 * Mongoose schemas both derive from these, so a new style cannot be accepted
 * by one layer and rejected by the other.
 */
export const VIDEO_STYLES = [
  "Pixar",
  "Disney",
  "Anime",
  "Cartoon",
  "Studio Ghibli",
  "Clay Animation",
  "Minecraft",
  "Lego",
  "Comic",
  "Cyberpunk",
  "Realistic 3D",
] as const;

export const ASPECT_RATIOS = ["16:9", "9:16", "1:1"] as const;
export const DURATIONS = [5, 10, 15] as const;
export const GENERATION_STATUSES = ["queued", "processing", "completed", "failed"] as const;

export type VideoStyle = (typeof VIDEO_STYLES)[number];
export type AspectRatio = (typeof ASPECT_RATIOS)[number];
export type Duration = (typeof DURATIONS)[number];
export type GenerationStatus = (typeof GENERATION_STATUSES)[number];

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  avatarUrl?: string;
  credits: number;
  createdAt: Date;
}

export interface VideoRecord {
  id: string;
  userId: string;
  title: string;
  url: string;
  thumbnailUrl?: string;
  provider: string;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface GenerationRecord {
  id: string;
  userId: string;
  videoId?: string;
  originalPrompt: string;
  enhancedPrompt: string;
  finalPrompt: string;
  style: VideoStyle;
  duration: number;
  aspectRatio: AspectRatio;
  status: GenerationStatus;
  provider: string;
  error?: string;
  createdAt: Date;
  updatedAt: Date;
}
