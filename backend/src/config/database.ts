import mongoose from "mongoose";
import { env } from "./env.js";

/** Connects to Atlas when configured; local development can run without external infrastructure. */
export async function connectDatabase(): Promise<void> {
  if (!env.MONGODB_URI) {
    console.warn("MONGODB_URI is not set; using temporary in-memory repositories.");
    return;
  }
  await mongoose.connect(env.MONGODB_URI);
  console.info("MongoDB connected.");
}
