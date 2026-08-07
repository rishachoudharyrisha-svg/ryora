import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  // Read from the repo root so the frontend and backend share one .env source
  // rather than duplicating the API port in two places.
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: { "@": new URL("./src", import.meta.url).pathname },
    },
    server: {
      port: Number(env.VITE_PORT) || 5173,
      // Dev-only: forwards /api to the backend so the browser stays same-origin.
      // Production uses VITE_API_URL instead; neither path hardcodes a host.
      proxy: {
        "/api": {
          target: env.VITE_API_PROXY_TARGET || "http://localhost:5001",
          changeOrigin: true,
        },
      },
    },
  };
});
