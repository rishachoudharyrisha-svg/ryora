import { randomUUID } from "node:crypto";
import { GenerationModel } from "../models/generation.model.js";
import type { AspectRatio, GenerationRecord, GenerationStatus, VideoStyle } from "../types/domain.js";
import { byNewest, databaseEnabled, isValidObjectId } from "./shared.js";

const memory: GenerationRecord[] = [];

type GenerationLike = {
  _id: unknown;
  userId: unknown;
  videoId?: unknown;
  originalPrompt: string;
  enhancedPrompt: string;
  finalPrompt: string;
  style: string;
  duration: number;
  aspectRatio: string;
  status: string;
  provider: string;
  error?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
};

const toRecord = (value: GenerationLike): GenerationRecord => ({
  id: String(value._id),
  userId: String(value.userId),
  videoId: value.videoId ? String(value.videoId) : undefined,
  originalPrompt: value.originalPrompt,
  enhancedPrompt: value.enhancedPrompt,
  finalPrompt: value.finalPrompt,
  style: value.style as VideoStyle,
  duration: value.duration,
  aspectRatio: value.aspectRatio as AspectRatio,
  status: value.status as GenerationStatus,
  provider: value.provider,
  error: value.error ?? undefined,
  createdAt: value.createdAt ?? new Date(),
  updatedAt: value.updatedAt ?? new Date(),
});

export const generationRepository = {
  async create(input: Omit<GenerationRecord, "id" | "createdAt" | "updatedAt">): Promise<GenerationRecord> {
    if (databaseEnabled()) return toRecord(await GenerationModel.create(input));
    const now = new Date();
    const record: GenerationRecord = { ...input, id: randomUUID(), createdAt: now, updatedAt: now };
    memory.push(record);
    return record;
  },

  async update(id: string, input: Partial<GenerationRecord>): Promise<GenerationRecord | undefined> {
    if (databaseEnabled()) {
      if (!isValidObjectId(id)) return undefined;
      const value = await GenerationModel.findByIdAndUpdate(id, input, { new: true }).lean();
      return value ? toRecord(value) : undefined;
    }
    const record = memory.find((item) => item.id === id);
    if (record) Object.assign(record, input, { updatedAt: new Date() });
    return record;
  },

  async findById(id: string): Promise<GenerationRecord | undefined> {
    if (databaseEnabled()) {
      if (!isValidObjectId(id)) return undefined;
      const value = await GenerationModel.findById(id).lean();
      return value ? toRecord(value) : undefined;
    }
    return memory.find((item) => item.id === id);
  },

  async listByUser(
    userId: string,
    page: number,
    limit: number,
  ): Promise<{ items: GenerationRecord[]; total: number }> {
    if (databaseEnabled()) {
      const [items, total] = await Promise.all([
        GenerationModel.find({ userId })
          .sort({ createdAt: -1 })
          .skip((page - 1) * limit)
          .limit(limit)
          .lean(),
        GenerationModel.countDocuments({ userId }),
      ]);
      return { items: items.map(toRecord), total };
    }
    const items = memory.filter((item) => item.userId === userId).sort(byNewest);
    return { items: items.slice((page - 1) * limit, page * limit), total: items.length };
  },
};
