import { randomUUID } from "node:crypto";
import { VideoModel } from "../models/video.model.js";
import type { VideoRecord } from "../types/domain.js";
import { byNewest, databaseEnabled, isValidObjectId } from "./shared.js";

const memory: VideoRecord[] = [];

type VideoLike = {
  _id: unknown;
  userId: unknown;
  title: string;
  url: string;
  thumbnailUrl?: string | null;
  provider: string;
  isFavorite?: boolean | null;
  createdAt?: Date;
  updatedAt?: Date;
};

const toRecord = (value: VideoLike): VideoRecord => ({
  id: String(value._id),
  userId: String(value.userId),
  title: value.title,
  url: value.url,
  thumbnailUrl: value.thumbnailUrl ?? undefined,
  provider: value.provider,
  isFavorite: value.isFavorite ?? false,
  createdAt: value.createdAt ?? new Date(),
  updatedAt: value.updatedAt ?? new Date(),
});

export const videoRepository = {
  async create(
    input: Omit<VideoRecord, "id" | "createdAt" | "updatedAt" | "isFavorite">,
  ): Promise<VideoRecord> {
    if (databaseEnabled()) return toRecord(await VideoModel.create(input));
    const now = new Date();
    const record: VideoRecord = {
      ...input,
      id: randomUUID(),
      isFavorite: false,
      createdAt: now,
      updatedAt: now,
    };
    memory.push(record);
    return record;
  },

  async findById(id: string): Promise<VideoRecord | undefined> {
    if (databaseEnabled()) {
      if (!isValidObjectId(id)) return undefined;
      const value = await VideoModel.findById(id).lean();
      return value ? toRecord(value) : undefined;
    }
    return memory.find((video) => video.id === id);
  },

  async listByUser(userId: string, favoriteOnly = false): Promise<VideoRecord[]> {
    if (databaseEnabled()) {
      const values = await VideoModel.find({
        userId,
        ...(favoriteOnly ? { isFavorite: true } : {}),
      })
        .sort({ createdAt: -1 })
        .lean();
      return values.map(toRecord);
    }
    return memory
      .filter((video) => video.userId === userId && (!favoriteOnly || video.isFavorite))
      .sort(byNewest);
  },

  async update(
    id: string,
    input: Partial<Pick<VideoRecord, "title" | "isFavorite">>,
  ): Promise<VideoRecord | undefined> {
    if (databaseEnabled()) {
      if (!isValidObjectId(id)) return undefined;
      const value = await VideoModel.findByIdAndUpdate(id, input, { new: true }).lean();
      return value ? toRecord(value) : undefined;
    }
    const video = memory.find((item) => item.id === id);
    if (video) Object.assign(video, input, { updatedAt: new Date() });
    return video;
  },

  async delete(id: string): Promise<boolean> {
    if (databaseEnabled()) {
      if (!isValidObjectId(id)) return false;
      return Boolean(await VideoModel.findByIdAndDelete(id));
    }
    const index = memory.findIndex((video) => video.id === id);
    if (index < 0) return false;
    memory.splice(index, 1);
    return true;
  },
};
