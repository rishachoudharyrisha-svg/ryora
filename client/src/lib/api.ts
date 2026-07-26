const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";
export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  credits: number;
};
export type Video = {
  id: string;
  title: string;
  url: string;
  thumbnailUrl?: string;
  provider: string;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
};
export type Generation = {
  id: string;
  videoId?: string;
  originalPrompt: string;
  enhancedPrompt: string;
  style: string;
  duration: number;
  aspectRatio: string;
  status: string;
  createdAt: string;
};
export const session = {
  get token() {
    return localStorage.getItem("kyora_token");
  },
  set(token: string) {
    localStorage.setItem("kyora_token", token);
  },
  clear() {
    localStorage.removeItem("kyora_token");
  },
};
export async function api<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(session.token ? { Authorization: `Bearer ${session.token}` } : {}),
      ...options.headers,
    },
  });
  const data = response.status === 204 ? undefined : await response.json();
  if (!response.ok)
    throw new Error(data?.error?.message ?? "Something went wrong.");
  return data as T;
}
