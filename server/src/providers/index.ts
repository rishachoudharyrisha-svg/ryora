import { MockVideoProvider } from "./local-video.provider.js";
import type { IVideoProvider } from "./contracts.js";
export const videoProvider: IVideoProvider = new MockVideoProvider();
