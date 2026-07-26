import { Schema, model } from "mongoose";
const videoSchema = new Schema({ userId: { type: Schema.Types.ObjectId, required: true, index: true }, title: { type: String, required: true }, url: { type: String, required: true }, thumbnailUrl: String, provider: { type: String, required: true }, isFavorite: { type: Boolean, default: false } }, { timestamps: true });
export const VideoModel = model("Video", videoSchema);
