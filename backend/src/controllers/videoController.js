import asyncHandler from "express-async-handler";
import Video from "../models/Video.js";

// @desc    Get all videos (optionally filter by platform)
// @route   GET /api/videos
// @access  Public
export const getVideos = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.platform) filter.platform = req.query.platform;

  const videos = await Video.find(filter).sort("-createdAt").limit(parseInt(req.query.limit, 10) || 20);
  res.json({ success: true, count: videos.length, data: videos });
});

// @desc    Add a new video (YouTube Short / Instagram Reel)
// @route   POST /api/videos
// @access  Private/Creator
export const createVideo = asyncHandler(async (req, res) => {
  const video = await Video.create(req.body);
  res.status(201).json({ success: true, data: video });
});

// @desc    Delete a video
// @route   DELETE /api/videos/:id
// @access  Private/Creator
export const deleteVideo = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id);
  if (!video) {
    res.status(404);
    throw new Error("Video not found");
  }
  await video.deleteOne();
  res.json({ success: true, data: {} });
});
