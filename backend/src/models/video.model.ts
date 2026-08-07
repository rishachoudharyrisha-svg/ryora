import { Schema, model, type InferSchemaType, type HydratedDocument } from "mongoose";

const videoSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, index: true },
    title: { type: String, required: true, trim: true },
    url: { type: String, required: true },
    thumbnailUrl: { type: String },
    provider: { type: String, required: true },
    isFavorite: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
);

// Backs the default library listing and the favourites filter.
videoSchema.index({ userId: 1, createdAt: -1 });

export type VideoDocument = HydratedDocument<InferSchemaType<typeof videoSchema>>;

export const VideoModel = model("Video", videoSchema);
