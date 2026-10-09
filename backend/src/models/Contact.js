import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    company: { type: String, trim: true, default: "" },
    collaborationType: {
      type: String,
      enum: ["brand-deal", "restaurant-feature", "recipe-development", "media", "other"],
      default: "other",
    },
    message: { type: String, required: true, trim: true },
    status: { type: String, enum: ["new", "read", "responded"], default: "new" },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
