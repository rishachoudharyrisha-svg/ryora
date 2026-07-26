import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { videoRepository } from "../services/repositories.js";
import { z } from "zod";
export const videoRouter = Router(); videoRouter.use(requireAuth);
videoRouter.get("/videos", async (request, response, next) => { try { response.json({ videos: await videoRepository.listByUser(request.userId!, request.query.favorite === "true") }); } catch (error) { next(error); } });
videoRouter.patch("/video/:id", async (request, response, next) => { try { const current = await videoRepository.findById(request.params.id); if (!current || current.userId !== request.userId) throw Object.assign(new Error("Video not found."), { status: 404 }); const update = z.object({ title: z.string().trim().min(1).max(120).optional(), isFavorite: z.boolean().optional() }).parse(request.body); response.json({ video: await videoRepository.update(current.id, update) }); } catch (error) { next(error); } });
videoRouter.delete("/video/:id", async (request, response, next) => { try { const current = await videoRepository.findById(request.params.id); if (!current || current.userId !== request.userId) throw Object.assign(new Error("Video not found."), { status: 404 }); await videoRepository.delete(current.id); response.status(204).end(); } catch (error) { next(error); } });
