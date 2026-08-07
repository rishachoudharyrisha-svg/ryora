import { env } from "../config/env.js";
import type { IVideoProvider } from "./contracts.js";

/** Public demo-media provider backed by the Kyora frontend deployment. */
export class LocalVideoProvider implements IVideoProvider {
  readonly name = "local-demo";

  async generate(): Promise<{ url: string; thumbnailUrl: string; provider: string }> {
    const origin = env.CLIENT_ORIGIN.replace(/\/$/, "");
    return { url: `${origin}/demo/sample.mp4`, thumbnailUrl: `${origin}/demo/sample-poster.svg`, provider: this.name };
  }
}
