import api from "./axios";

export const getRecipes = (params) => api.get("/recipes", { params });
export const getRecipe = (idOrSlug) => api.get(`/recipes/${idOrSlug}`);
export const createRecipe = (payload) => api.post("/recipes", payload);
export const updateRecipe = (id, payload) => api.put(`/recipes/${id}`, payload);
export const deleteRecipe = (id) => api.delete(`/recipes/${id}`);
export const addReview = (id, payload) => api.post(`/recipes/${id}/reviews`, payload);
export const toggleFavorite = (id) => api.post(`/recipes/${id}/favorite`);
export const getAnalytics = () => api.get("/recipes/analytics/summary");
export const suggestFromIngredients = (ingredients) => api.post("/ai/suggest", { ingredients });
