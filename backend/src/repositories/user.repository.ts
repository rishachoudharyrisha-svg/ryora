import { randomUUID } from "node:crypto";
import { UserModel } from "../models/user.model.js";
import type { UserRecord } from "../types/domain.js";
import { databaseEnabled, isValidObjectId } from "./shared.js";

const memory: UserRecord[] = [];

type UserLike = {
  _id: unknown;
  name: string;
  email: string;
  passwordHash: string;
  avatarUrl?: string | null;
  credits?: number | null;
  createdAt?: Date;
};

const toRecord = (value: UserLike): UserRecord => ({
  id: String(value._id),
  name: value.name,
  email: value.email,
  passwordHash: value.passwordHash,
  avatarUrl: value.avatarUrl ?? undefined,
  credits: value.credits ?? 0,
  createdAt: value.createdAt ?? new Date(),
});

export const userRepository = {
  async create(input: Omit<UserRecord, "id" | "createdAt">): Promise<UserRecord> {
    if (databaseEnabled()) return toRecord(await UserModel.create(input));
    const record: UserRecord = { ...input, id: randomUUID(), createdAt: new Date() };
    memory.push(record);
    return record;
  },

  async findByEmail(email: string): Promise<UserRecord | undefined> {
    if (databaseEnabled()) {
      const value = await UserModel.findOne({ email }).lean();
      return value ? toRecord(value) : undefined;
    }
    return memory.find((user) => user.email === email);
  },

  async findById(id: string): Promise<UserRecord | undefined> {
    if (databaseEnabled()) {
      if (!isValidObjectId(id)) return undefined;
      const value = await UserModel.findById(id).lean();
      return value ? toRecord(value) : undefined;
    }
    return memory.find((user) => user.id === id);
  },

  async update(
    id: string,
    input: Partial<Pick<UserRecord, "name" | "avatarUrl">>,
  ): Promise<UserRecord | undefined> {
    if (databaseEnabled()) {
      if (!isValidObjectId(id)) return undefined;
      const value = await UserModel.findByIdAndUpdate(id, input, { new: true }).lean();
      return value ? toRecord(value) : undefined;
    }
    const user = memory.find((item) => item.id === id);
    if (user) Object.assign(user, input);
    return user;
  },

  /**
   * Conditional decrement: the credits > 0 filter runs inside the write, so two
   * concurrent generations cannot both consume the same last credit.
   */
  async decrementCredit(id: string): Promise<UserRecord | undefined> {
    if (databaseEnabled()) {
      if (!isValidObjectId(id)) return undefined;
      const value = await UserModel.findOneAndUpdate(
        { _id: id, credits: { $gt: 0 } },
        { $inc: { credits: -1 } },
        { new: true },
      ).lean();
      return value ? toRecord(value) : undefined;
    }
    const user = memory.find((item) => item.id === id);
    if (!user || user.credits <= 0) return undefined;
    user.credits -= 1;
    return user;
  },

  async incrementCredit(id: string): Promise<UserRecord | undefined> {
    if (databaseEnabled()) {
      if (!isValidObjectId(id)) return undefined;
      const value = await UserModel.findByIdAndUpdate(id, { $inc: { credits: 1 } }, { new: true }).lean();
      return value ? toRecord(value) : undefined;
    }
    const user = memory.find((item) => item.id === id);
    if (!user) return undefined;
    user.credits += 1;
    return user;
  },
};
