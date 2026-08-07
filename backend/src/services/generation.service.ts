import { NotFoundError } from "../errors.js";
import { videoProvider } from "../providers/index.js";
import { generationRepository, videoRepository } from "../repositories/index.js";
import type { GenerateInput } from "../validators/schemas.js";
import { creditService } from "./credit.service.js";
import { enhancePrompt } from "./prompt.service.js";

const TITLE_MAX_LENGTH = 72;

export const generationService = {
  /**
   * Reserves a credit, enhances the prompt, renders through the configured
   * provider, then records the video. Any failure after the reservation marks
   * the generation failed and refunds the credit, so a provider outage never
   * silently costs the user.
   */
  async generate(userId: string, input: GenerateInput) {
    const credits = await creditService.reserve(userId);
    let generationId: string | undefined;

    try {
      const enhancedPrompt = await enhancePrompt(input);

      const generation = await generationRepository.create({
        userId,
        originalPrompt: input.prompt,
        enhancedPrompt,
        finalPrompt: enhancedPrompt,
        style: input.style,
        duration: input.duration,
        aspectRatio: input.aspectRatio,
        status: "processing",
        provider: videoProvider.name,
      });
      generationId = generation.id;

      const output = await videoProvider.generate({
        prompt: enhancedPrompt,
        style: input.style,
        duration: input.duration,
        aspectRatio: input.aspectRatio,
      });

      const video = await videoRepository.create({
        userId,
        title: input.prompt.slice(0, TITLE_MAX_LENGTH),
        ...output,
      });

      const completed = await generationRepository.update(generation.id, {
        status: "completed",
        videoId: video.id,
      });

      return { generation: completed, video, credits };
    } catch (error) {
      if (generationId) {
        await generationRepository.update(generationId, {
          status: "failed",
          error: error instanceof Error ? error.message : "Generation failed.",
        });
      }
      await creditService.refund(userId);
      throw error;
    }
  },

  async findById(generationId: string, userId: string) {
    const generation = await generationRepository.findById(generationId);
    if (!generation || generation.userId !== userId) throw new NotFoundError("Generation not found.");

    const video = generation.videoId ? await videoRepository.findById(generation.videoId) : undefined;

    return {
      ...generation,
      videoUrl: video?.url,
      thumbnailUrl: video?.thumbnailUrl,
      provider: video?.provider ?? generation.provider,
    };
  },

  history: (userId: string, page: number, limit: number) =>
    generationRepository.listByUser(userId, page, limit),
};
