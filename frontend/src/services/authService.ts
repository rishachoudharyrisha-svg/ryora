import { api, session } from "@/lib/api";

export const authService = {
  async login(credentials: FormData) {
    const result = await api<{ token: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(credentials)),
    });
    session.set(result.token);
    return result;
  },
};