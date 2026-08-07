import { api, type Generation, type Video } from "@/lib/api";

export const videoService = {
  getVideos: (favorites?: boolean) =>
    api<{ videos: Video[] }>(`/videos${favorites ? "?favorite=true" : ""}`),

  toggleFavorite: (video: Video) =>
    api(`/videos/${video.id}`, {
      method: "PATCH",
      body: JSON.stringify({ isFavorite: !video.isFavorite }),
    }),

  deleteVideo: (id: string) => api(`/videos/${id}`, { method: "DELETE" }),

  getHistory: () => api<{ items: Generation[]; total: number }>("/history"),

  generateVideo: (data: {
    prompt: string;
    style: string;
    duration: number;
    aspectRatio: string;
  }) =>
    api("/generate", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
export type { Video };