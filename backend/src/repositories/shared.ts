import mongoose from "mongoose";

/**
 * Every repository runs in one of two modes: backed by MongoDB when a
 * connection is live, or by in-process arrays for offline local development.
 */
export const databaseEnabled = (): boolean => mongoose.connection.readyState === 1;

/** Guards findById-style lookups so a malformed id yields "not found" instead of a CastError 500. */
export const isValidObjectId = (id: string): boolean => mongoose.Types.ObjectId.isValid(id);

/** Newest-first ordering shared by the in-memory listing fallbacks. */
export const byNewest = <T extends { createdAt: Date }>(a: T, b: T): number =>
  b.createdAt.getTime() - a.createdAt.getTime();
