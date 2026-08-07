import { NotFoundError } from "../errors.js";
import { videoRepository } from "../repositories/index.js";
import type { VideoRecord } from "../types/domain.js";
import type { UpdateVideoInput } from "../validators/schemas.js";

/**
 * Loads a video and asserts ownership in one step. Returning the same
 * NotFoundError for "missing" and "someone else's" keeps other users' ids
 * unprobeable.
 */
async function findOwned(videoId: string, userId: string): Promise<VideoRecord> {
  const video = await videoRepository.findById(videoId);
  if (!video || video.userId !== userId) throw new NotFoundError("Video not found.");
  return video;
}

export const videoService = {
  list: (userId: string, favoriteOnly = false) => videoRepository.listByUser(userId, favoriteOnly),

  async update(videoId: string, userId: string, input: UpdateVideoInput) {
    const video = await findOwned(videoId, userId);
    const updated = await videoRepository.update(video.id, input);
    if (!updated) throw new NotFoundError("Video not found.");
    return updated;
  },

  async remove(videoId: string, userId: string) {
    const video = await findOwned(videoId, userId);
    await videoRepository.delete(video.id);
  },
};
