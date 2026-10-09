import express from "express";
import {
  getRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  addReview,
  toggleFavorite,
  getAnalytics,
} from "../controllers/recipeController.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/analytics/summary", protect, restrictTo("creator", "admin"), getAnalytics);

router
  .route("/")
  .get(getRecipes)
  .post(protect, restrictTo("creator", "admin"), upload.single("image"), createRecipe);

router
  .route("/:id")
  .get(getRecipe)
  .put(protect, restrictTo("creator", "admin"), updateRecipe)
  .delete(protect, restrictTo("creator", "admin"), deleteRecipe);

router.post("/:id/reviews", protect, addReview);
router.post("/:id/favorite", protect, toggleFavorite);

export default router;
