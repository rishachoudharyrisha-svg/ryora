import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { videoProvider } from "../providers/index.js";
import { enhancePrompt } from "../services/prompt.service.js";
import { creditService } from "../services/credit.service.js";
import {
  generationRepository,
  videoRepository,
} from "../services/repositories.js";
import { generateSchema } from "../validators/schemas.js";
export const generationRouter = Router();
generationRouter.use(requireAuth);
generationRouter.post("/generate", async (request, response, next) => {
  let generationId: string | undefined;
  try {
    const input = generateSchema.parse(request.body);
    await creditService.assertAvailable(request.userId!);
    const enhancedPrompt = await enhancePrompt(input);
    const generation = await generationRepository.create({
      userId: request.userId!,
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
      userId: request.userId!,
      title: input.prompt.slice(0, 72),
      ...output,
    });
    const credits = await creditService.consumeAfterSuccessfulGeneration(
      request.userId!,
    );
    const completed = await generationRepository.update(generation.id, {
      status: "completed",
      videoId: video.id,
    });
    response.status(201).json({ generation: completed, video, credits });
  } catch (error) {
    if (generationId)
      await generationRepository.update(generationId, {
        status: "failed",
        error: error instanceof Error ? error.message : "Generation failed.",
      });
    next(error);
  }
});
generationRouter.get("/generation/:id", async (request, response, next) => {
  try {
    const generation = await generationRepository.findById(request.params.id);
    if (!generation || generation.userId !== request.userId)
      throw Object.assign(new Error("Generation not found."), { status: 404 });
    const video = generation.videoId
      ? await videoRepository.findById(generation.videoId)
      : undefined;
    response.json({
      generation: {
        ...generation,
        videoUrl: video?.url,
        thumbnailUrl: video?.thumbnailUrl,
        provider: video?.provider ?? generation.provider,
        timestamps: {
          createdAt: generation.createdAt,
          updatedAt: generation.updatedAt,
        },
      },
    });
  } catch (error) {
    next(error);
  }
});
generationRouter.get("/history", async (request, response, next) => {
  try {
    const page = Math.max(1, Number(request.query.page) || 1);
    const limit = Math.min(50, Math.max(1, Number(request.query.limit) || 12));
    const result = await generationRepository.listByUser(
      request.userId!,
      page,
      limit,
    );
    response.json({ ...result, page, limit });
  } catch (error) {
    next(error);
  }
});
