import { api, type User } from "@/lib/api";

export const profileService = {
  getProfile: () => api<{ user: User }>("/profile"),
  updateProfile: (name: string) =>
    api("/profile", {
      method: "PATCH",
      body: JSON.stringify({ name }),
    }),
};