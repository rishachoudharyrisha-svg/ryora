import { Schema, model, type InferSchemaType, type HydratedDocument } from "mongoose";
import { ASPECT_RATIOS, GENERATION_STATUSES, VIDEO_STYLES } from "../types/domain.js";

const generationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, index: true },
    videoId: { type: Schema.Types.ObjectId },
    originalPrompt: { type: String, required: true },
    enhancedPrompt: { type: String, required: true },
    finalPrompt: { type: String, required: true },
    style: { type: String, required: true, enum: VIDEO_STYLES },
    duration: { type: Number, required: true },
    aspectRatio: { type: String, required: true, enum: ASPECT_RATIOS },
    status: { type: String, required: true, enum: GENERATION_STATUSES },
    provider: { type: String, required: true },
    error: { type: String },
  },
  { timestamps: true },
);

// Backs the paginated history listing.
generationSchema.index({ userId: 1, createdAt: -1 });

export type GenerationDocument = HydratedDocument<InferSchemaType<typeof generationSchema>>;

export const GenerationModel = model("Generation", generationSchema);
