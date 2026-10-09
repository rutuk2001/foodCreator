import mongoose from "mongoose";
import slugify from "slugify";

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, trim: true, maxlength: 500 },
  },
  { timestamps: true }
);

const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    slug: { type: String, unique: true },
    description: { type: String, required: true, trim: true },
    ingredients: [
      {
        name: { type: String, required: true },
        quantity: { type: String, default: "" },
      },
    ],
    steps: [
      {
        order: Number,
        title: String,
        content: { type: String, required: true },
        image: String,
      },
    ],
    category: {
      type: String,
      enum: ["breakfast", "lunch", "dinner", "dessert", "snack", "drink"],
      required: true,
    },
    cuisine: { type: String, required: true, trim: true },
    dietType: { type: String, enum: ["veg", "non-veg", "vegan"], default: "veg" },
    prepTime: { type: Number, required: true }, // minutes
    cookingTime: { type: Number, required: true }, // minutes
    servings: { type: Number, default: 2 },
    difficulty: { type: String, enum: ["easy", "medium", "hard"], default: "easy" },
    image: { type: String, required: true },
    video: { type: String, default: "" },
    nutrition: {
      calories: Number,
      protein: Number,
      carbs: Number,
      fat: Number,
    },
    views: { type: Number, default: 0 },
    reviews: [reviewSchema],
    avgRating: { type: Number, default: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

recipeSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true }) + "-" + Date.now().toString().slice(-5);
  }
  next();
});

recipeSchema.methods.recalculateRating = function () {
  if (this.reviews.length === 0) {
    this.avgRating = 0;
  } else {
    const total = this.reviews.reduce((sum, r) => sum + r.rating, 0);
    this.avgRating = Math.round((total / this.reviews.length) * 10) / 10;
  }
};

recipeSchema.index({ title: "text", "ingredients.name": "text", cuisine: "text" });

export default mongoose.model("Recipe", recipeSchema);
