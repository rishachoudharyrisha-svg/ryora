export type User = {
  id: string;
  name: string;
  email: string;
  credits: number;
};

export type Video = {
  id: string;
  title: string;
  url: string;
  thumbnailUrl: string;
  provider: string;
  isFavorite: boolean;
};

export type Generation = {
  id: string;
  originalPrompt: string;
  enhancedPrompt: string;
  status: string;
  style: string;
  duration: number;
  aspectRatio: string;
};

export const session = {
  get token() {
    return localStorage.getItem("token");
  },
  set(token: string) {
    localStorage.setItem("token", token);
  },
  clear() {
    localStorage.removeItem("token");
  },
};

const API_BASE = import.meta.env.VITE_API_URL ?? "";

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  if (session.token) {
    headers.set("Authorization", `Bearer ${session.token}`);
  }
  const res = await fetch(`${API_BASE}/api${path}`, { ...options, headers });
  const data = res.status === 204 ? null : await res.json();
  if (!res.ok) {
    throw new Error(data?.error?.message || "API request failed");
  }
  return data as T;
}