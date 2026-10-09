import asyncHandler from "express-async-handler";
import Recipe from "../models/Recipe.js";
import User from "../models/User.js";
import APIFeatures from "../utils/apiFeatures.js";

// @desc    Get all recipes (search, filter, sort, paginate)
// @route   GET /api/recipes
// @access  Public
export const getRecipes = asyncHandler(async (req, res) => {
  const features = new APIFeatures(Recipe.find(), req.query).search().filter().sort().paginate();

  const [recipes, total] = await Promise.all([
    features.query,
    Recipe.countDocuments(),
  ]);

  res.json({
    success: true,
    count: recipes.length,
    total,
    page: parseInt(req.query.page, 10) || 1,
    data: recipes,
  });
});

// @desc    Get single recipe by id or slug
// @route   GET /api/recipes/:id
// @access  Public
export const getRecipe = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const query = id.match(/^[0-9a-fA-F]{24}$/) ? { _id: id } : { slug: id };

  const recipe = await Recipe.findOne(query).populate("reviews.user", "name avatar");
  if (!recipe) {
    res.status(404);
    throw new Error("Recipe not found");
  }

  recipe.views += 1;
  await recipe.save();

  // Related recipes: same category, excluding this one
  const related = await Recipe.find({ category: recipe.category, _id: { $ne: recipe._id } })
    .limit(4)
    .select("title slug image cookingTime difficulty avgRating");

  res.json({ success: true, data: recipe, related });
});

// @desc    Create a recipe
// @route   POST /api/recipes
// @access  Private/Creator
export const createRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.create({ ...req.body, createdBy: req.user._id });
  res.status(201).json({ success: true, data: recipe });
});

// @desc    Update a recipe
// @route   PUT /api/recipes/:id
// @access  Private/Creator
export const updateRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) {
    res.status(404);
    throw new Error("Recipe not found");
  }

  Object.assign(recipe, req.body);
  await recipe.save();

  res.json({ success: true, data: recipe });
});

// @desc    Delete a recipe
// @route   DELETE /api/recipes/:id
// @access  Private/Creator
export const deleteRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) {
    res.status(404);
    throw new Error("Recipe not found");
  }
  await recipe.deleteOne();
  res.json({ success: true, data: {} });
});

// @desc    Add a review/rating to a recipe
// @route   POST /api/recipes/:id/reviews
// @access  Private
export const addReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) {
    res.status(404);
    throw new Error("Recipe not found");
  }

  const alreadyReviewed = recipe.reviews.find((r) => r.user.toString() === req.user._id.toString());
  if (alreadyReviewed) {
    res.status(400);
    throw new Error("You have already reviewed this recipe");
  }

  recipe.reviews.push({ user: req.user._id, rating, comment });
  recipe.recalculateRating();
  await recipe.save();

  res.status(201).json({ success: true, data: recipe });
});

// @desc    Toggle favorite recipe for logged-in user
// @route   POST /api/recipes/:id/favorite
// @access  Private
export const toggleFavorite = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const recipeId = req.params.id;

  const index = user.favorites.findIndex((f) => f.toString() === recipeId);
  let favorited;
  if (index > -1) {
    user.favorites.splice(index, 1);
    favorited = false;
  } else {
    user.favorites.push(recipeId);
    favorited = true;
  }
  await user.save();

  res.json({ success: true, favorited, favorites: user.favorites });
});

// @desc    Get analytics summary for creator dashboard
// @route   GET /api/recipes/analytics/summary
// @access  Private/Creator
export const getAnalytics = asyncHandler(async (req, res) => {
  const totalRecipes = await Recipe.countDocuments();
  const totalViews = await Recipe.aggregate([{ $group: { _id: null, total: { $sum: "$views" } } }]);
  const popularRecipes = await Recipe.find().sort("-views").limit(5).select("title views avgRating slug");
  const totalUsers = await User.countDocuments();

  res.json({
    success: true,
    data: {
      totalRecipes,
      totalViews: totalViews[0]?.total || 0,
      totalUsers,
      popularRecipes,
    },
  });
});
