import { randomUUID } from "node:crypto";
import mongoose from "mongoose";
import { GenerationModel } from "../models/generation.model.js";
import { UserModel } from "../models/user.model.js";
import { VideoModel } from "../models/video.model.js";
import type {
  GenerationRecord,
  UserRecord,
  VideoRecord,
} from "../types/domain.js";

const users: UserRecord[] = [];
const videos: VideoRecord[] = [];
const generations: GenerationRecord[] = [];
const databaseEnabled = () => mongoose.connection.readyState === 1;
const userShape = (value: any): UserRecord => ({
  id: value._id.toString(),
  name: value.name,
  email: value.email,
  passwordHash: value.passwordHash,
  avatarUrl: value.avatarUrl,
  credits: value.credits ?? 1,
  createdAt: value.createdAt,
});
const videoShape = (value: any): VideoRecord => ({
  id: value._id.toString(),
  userId: value.userId.toString(),
  title: value.title,
  url: value.url,
  thumbnailUrl: value.thumbnailUrl,
  provider: value.provider,
  isFavorite: value.isFavorite,
  createdAt: value.createdAt,
  updatedAt: value.updatedAt,
});
const generationShape = (value: any): GenerationRecord => ({
  id: value._id.toString(),
  userId: value.userId.toString(),
  videoId: value.videoId?.toString(),
  originalPrompt: value.originalPrompt,
  enhancedPrompt: value.enhancedPrompt,
  finalPrompt: value.finalPrompt,
  style: value.style,
  duration: value.duration,
  aspectRatio: value.aspectRatio,
  status: value.status,
  provider: value.provider,
  error: value.error,
  createdAt: value.createdAt,
  updatedAt: value.updatedAt,
});

export const userRepository = {
  async create(input: Omit<UserRecord, "id" | "createdAt">) {
    if (databaseEnabled()) return userShape(await UserModel.create(input));
    const record = { ...input, id: randomUUID(), createdAt: new Date() };
    users.push(record);
    return record;
  },
  async findByEmail(email: string) {
    if (databaseEnabled()) {
      const value = await UserModel.findOne({ email }).lean();
      return value ? userShape(value) : undefined;
    }
    return users.find((user) => user.email === email);
  },
  async findById(id: string) {
    if (databaseEnabled()) {
      const value = await UserModel.findById(id).lean();
      return value ? userShape(value) : undefined;
    }
    return users.find((user) => user.id === id);
  },
  async update(
    id: string,
    input: Partial<Pick<UserRecord, "name" | "avatarUrl">>,
  ) {
    if (databaseEnabled()) {
      const value = await UserModel.findByIdAndUpdate(id, input, {
        new: true,
      }).lean();
      return value ? userShape(value) : undefined;
    }
    const user = users.find((item) => item.id === id);
    if (user) Object.assign(user, input);
    return user;
  },
  async decrementCredit(id: string) {
    if (databaseEnabled()) {
      const value = await UserModel.findOneAndUpdate(
        { _id: id, credits: { $gt: 0 } },
        { $inc: { credits: -1 } },
        { new: true },
      ).lean();
      return value ? userShape(value) : undefined;
    }
    const user = users.find((item) => item.id === id);
    if (!user || user.credits <= 0) return undefined;
    user.credits -= 1;
    return user;
  },
};
export const videoRepository = {
  async create(
    input: Omit<VideoRecord, "id" | "createdAt" | "updatedAt" | "isFavorite">,
  ) {
    if (databaseEnabled()) return videoShape(await VideoModel.create(input));
    const createdAt = new Date();
    const record = {
      ...input,
      id: randomUUID(),
      isFavorite: false,
      createdAt,
      updatedAt: createdAt,
    };
    videos.push(record);
    return record;
  },
  async findById(id: string) {
    if (databaseEnabled()) {
      const value = await VideoModel.findById(id).lean();
      return value ? videoShape(value) : undefined;
    }
    return videos.find((video) => video.id === id);
  },
  async listByUser(userId: string, favoriteOnly = false) {
    if (databaseEnabled())
      return (
        await VideoModel.find({
          userId,
          ...(favoriteOnly ? { isFavorite: true } : {}),
        })
          .sort({ createdAt: -1 })
          .lean()
      ).map(videoShape);
    return videos
      .filter(
        (video) =>
          video.userId === userId && (!favoriteOnly || video.isFavorite),
      )
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  },
  async update(
    id: string,
    input: Partial<Pick<VideoRecord, "title" | "isFavorite">>,
  ) {
    if (databaseEnabled()) {
      const value = await VideoModel.findByIdAndUpdate(id, input, {
        new: true,
      }).lean();
      return value ? videoShape(value) : undefined;
    }
    const video = videos.find((item) => item.id === id);
    if (video) Object.assign(video, input, { updatedAt: new Date() });
    return video;
  },
  async delete(id: string) {
    if (databaseEnabled())
      return Boolean(await VideoModel.findByIdAndDelete(id));
    const index = videos.findIndex((video) => video.id === id);
    if (index < 0) return false;
    videos.splice(index, 1);
    return true;
  },
};
export const generationRepository = {
  async create(
    input: Omit<GenerationRecord, "id" | "createdAt" | "updatedAt">,
  ) {
    if (databaseEnabled())
      return generationShape(await GenerationModel.create(input));
    const createdAt = new Date();
    const record = {
      ...input,
      id: randomUUID(),
      createdAt,
      updatedAt: createdAt,
    };
    generations.push(record);
    return record;
  },
  async update(id: string, input: Partial<GenerationRecord>) {
    if (databaseEnabled()) {
      const value = await GenerationModel.findByIdAndUpdate(id, input, {
        new: true,
      }).lean();
      return value ? generationShape(value) : undefined;
    }
    const record = generations.find((item) => item.id === id);
    if (record) Object.assign(record, input, { updatedAt: new Date() });
    return record;
  },
  async findById(id: string) {
    if (databaseEnabled()) {
      const value = await GenerationModel.findById(id).lean();
      return value ? generationShape(value) : undefined;
    }
    return generations.find((item) => item.id === id);
  },
  async listByUser(userId: string, page: number, limit: number) {
    if (databaseEnabled()) {
      const [items, total] = await Promise.all([
        GenerationModel.find({ userId })
          .sort({ createdAt: -1 })
          .skip((page - 1) * limit)
          .limit(limit)
          .lean(),
        GenerationModel.countDocuments({ userId }),
      ]);
      return { items: items.map(generationShape), total };
    }
    const items = generations
      .filter((item) => item.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    return {
      items: items.slice((page - 1) * limit, page * limit),
      total: items.length,
    };
  },
};
