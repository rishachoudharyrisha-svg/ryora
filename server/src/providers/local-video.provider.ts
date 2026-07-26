import { env } from "../config/env.js";
import type { IVideoProvider } from "./contracts.js";

/** Free development provider backed by media bundled with the Kyora client. */
export class MockVideoProvider implements IVideoProvider {
  readonly name = "mock-local";

  async generate(): Promise<{ url: string; thumbnailUrl: string; provider: string }> {
    const origin = env.CLIENT_ORIGIN.replace(/\/$/, "");
    return { url: `${origin}/demo/sample.mp4`, thumbnailUrl: `${origin}/demo/sample-poster.svg`, provider: this.name };
  }
}
