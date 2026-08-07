import type { Request, Response } from "express";
import { generationService } from "../services/generation.service.js";
import { currentUserId } from "../utils/authenticated-user.js";
import { routeParam } from "../utils/route-param.js";
import { generateSchema, paginationSchema } from "../validators/schemas.js";

export const generationController = {
  async create(request: Request, response: Response) {
    const payload = generateSchema.parse(request.body);
    response.status(201).json(await generationService.generate(currentUserId(request), payload));
  },

  async show(request: Request, response: Response) {
    const generation = await generationService.findById(routeParam(request, "id"), currentUserId(request));
    response.json({ generation });
  },

  async history(request: Request, response: Response) {
    const { page, limit } = paginationSchema.parse(request.query);
    const result = await generationService.history(currentUserId(request), page, limit);
    response.json({ ...result, page, limit });
  },
};
