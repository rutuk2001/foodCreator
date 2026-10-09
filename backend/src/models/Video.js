import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    platform: { type: String, enum: ["youtube", "instagram"], required: true },
    url: { type: String, required: true },
    thumbnail: { type: String, required: true },
    views: { type: Number, default: 0 },
    relatedRecipe: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" },
  },
  { timestamps: true }
);

export default mongoose.model("Video", videoSchema);
