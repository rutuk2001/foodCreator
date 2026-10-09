import api from "./axios";

export const getVideos = (params) => api.get("/videos", { params });
export const createVideo = (payload) => api.post("/videos", payload);
export const deleteVideo = (id) => api.delete(`/videos/${id}`);
