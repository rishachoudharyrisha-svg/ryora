export type VideoStyle = "Pixar" | "Disney" | "Anime" | "Cartoon" | "Studio Ghibli" | "Clay Animation" | "Minecraft" | "Lego" | "Comic" | "Cyberpunk" | "Realistic 3D";
export type GenerationStatus = "queued" | "processing" | "completed" | "failed";

export interface UserRecord { id: string; name: string; email: string; passwordHash: string; avatarUrl?: string; createdAt: Date }
export interface VideoRecord { id: string; userId: string; title: string; url: string; thumbnailUrl?: string; provider: string; isFavorite: boolean; createdAt: Date; updatedAt: Date }
export interface GenerationRecord {
  id: string; userId: string; videoId?: string; originalPrompt: string; enhancedPrompt: string; finalPrompt: string;
  style: VideoStyle; duration: number; aspectRatio: "16:9" | "9:16" | "1:1"; status: GenerationStatus; provider: string; error?: string; createdAt: Date; updatedAt: Date;
}
