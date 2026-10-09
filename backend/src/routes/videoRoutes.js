import express from "express";
import { getVideos, createVideo, deleteVideo } from "../controllers/videoController.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getVideos)
  .post(protect, restrictTo("creator", "admin"), createVideo);

router.delete("/:id", protect, restrictTo("creator", "admin"), deleteVideo);

export default router;
