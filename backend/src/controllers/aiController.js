import asyncHandler from "express-async-handler";
import Recipe from "../models/Recipe.js";

// @desc    Suggest recipes from a list of ingredients the user has on hand
// @route   POST /api/ai/suggest
// @access  Public
// @body    { ingredients: ["eggs", "tomato", "rice"] }
//
// This endpoint currently does a simple ingredient-overlap match against the
// recipe database. It is structured so the matching step can be swapped for
// a real OpenAI call (see callOpenAI() below) without changing the route or
// response contract the frontend depends on.
export const suggestRecipes = asyncHandler(async (req, res) => {
  const { ingredients } = req.body;

  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    res.status(400);
    throw new Error("Please provide a list of ingredients, e.g. [\"eggs\", \"tomato\", \"rice\"]");
  }

  const normalized = ingredients.map((i) => i.trim().toLowerCase()).filter(Boolean);

  const recipes = await Recipe.find({
    "ingredients.name": { $in: normalized.map((i) => new RegExp(i, "i")) },
  }).limit(30);

  const scored = recipes
    .map((recipe) => {
      const recipeIngredientNames = recipe.ingredients.map((ing) => ing.name.toLowerCase());
      const matchCount = normalized.filter((i) =>
        recipeIngredientNames.some((name) => name.includes(i))
      ).length;
      return { recipe, matchCount, matchRatio: matchCount / recipe.ingredients.length };
    })
    .filter((s) => s.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount || b.matchRatio - a.matchRatio)
    .slice(0, 8)
    .map((s) => ({
      _id: s.recipe._id,
      title: s.recipe.title,
      slug: s.recipe.slug,
      image: s.recipe.image,
      cookingTime: s.recipe.cookingTime,
      matchedIngredients: s.matchCount,
      totalIngredients: s.recipe.ingredients.length,
    }));

  res.json({
    success: true,
    query: normalized,
    count: scored.length,
    data: scored,
    note:
      scored.length === 0
        ? "No close matches in the database yet — hook this endpoint up to OPENAI_API_KEY for open-ended AI suggestions."
        : undefined,
  });
});

// Placeholder for a real LLM-backed suggestion path.
// Wire this in once OPENAI_API_KEY is set, then call it from suggestRecipes
// as a fallback when the DB match count is low.
async function callOpenAI(ingredients) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const prompt = `Suggest 3 recipe ideas using mainly: ${ingredients.join(", ")}. 
Return strict JSON: [{ "title": "", "description": "", "estimatedTime": "" }]`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    }),
  });

  const data = await response.json();
  return data;
}
