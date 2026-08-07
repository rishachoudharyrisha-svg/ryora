import type { Request, Response } from "express";
import { videoService } from "../services/video.service.js";
import { currentUserId } from "../utils/authenticated-user.js";
import { routeParam } from "../utils/route-param.js";
import { updateVideoSchema } from "../validators/schemas.js";

export const videoController = {
  async list(request: Request, response: Response) {
    const favoriteOnly = request.query.favorite === "true";
    response.json({ videos: await videoService.list(currentUserId(request), favoriteOnly) });
  },

  async update(request: Request, response: Response) {
    const payload = updateVideoSchema.parse(request.body);
    const video = await videoService.update(routeParam(request, "id"), currentUserId(request), payload);
    response.json({ video });
  },

  async remove(request: Request, response: Response) {
    await videoService.remove(routeParam(request, "id"), currentUserId(request));
    response.status(204).end();
  },
};
