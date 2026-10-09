// Populates the database with a demo creator account, recipes, and videos.
// Run with: npm run seed
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import Recipe from "../models/Recipe.js";
import Video from "../models/Video.js";

dotenv.config();

const run = async () => {
  await connectDB();

  await Promise.all([User.deleteMany(), Recipe.deleteMany(), Video.deleteMany()]);

  const creator = await User.create({
    name: "Maya Rossi",
    email: "maya@kitchen.com",
    password: "password123",
    role: "creator",
  });

  const recipes = await Recipe.create([
    {
      title: "Charred Lemon Butter Salmon",
      description: "Crispy-skin salmon finished in nutty brown butter with charred lemon and thyme.",
      ingredients: [
        { name: "salmon fillet", quantity: "2 pieces" },
        { name: "butter", quantity: "3 tbsp" },
        { name: "lemon", quantity: "1" },
        { name: "thyme", quantity: "4 sprigs" },
        { name: "garlic", quantity: "2 cloves" },
      ],
      steps: [
        { order: 1, title: "Sear the salmon", content: "Pat the salmon dry and sear skin-side down until crisp." },
        { order: 2, title: "Build the butter sauce", content: "Add butter, garlic, and thyme; baste until nutty and fragrant." },
        { order: 3, title: "Char the lemon", content: "Char lemon halves in the same pan, squeeze over the salmon, and serve." },
      ],
      category: "dinner",
      cuisine: "Mediterranean",
      dietType: "non-veg",
      prepTime: 10,
      cookingTime: 15,
      servings: 2,
      difficulty: "medium",
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288",
      nutrition: { calories: 420, protein: 34, carbs: 4, fat: 28 },
      createdBy: creator._id,
    },
    {
      title: "Golden Egg Fried Rice",
      description: "Fluffy egg-coated rice with tomato, scallion, and a hit of garlic — a five-minute weeknight staple.",
      ingredients: [
        { name: "rice", quantity: "2 cups cooked" },
        { name: "eggs", quantity: "3" },
        { name: "tomato", quantity: "1" },
        { name: "scallion", quantity: "2 stalks" },
        { name: "soy sauce", quantity: "1 tbsp" },
      ],
      steps: [
        { order: 1, title: "Scramble the eggs", content: "Cook eggs low and slow until just set, then set aside." },
        { order: 2, title: "Fry the rice", content: "Fry day-old rice in a hot wok until each grain separates." },
        { order: 3, title: "Combine", content: "Fold in eggs, tomato, scallion, and soy sauce; toss and serve hot." },
      ],
      category: "lunch",
      cuisine: "Asian",
      dietType: "veg",
      prepTime: 5,
      cookingTime: 8,
      servings: 2,
      difficulty: "easy",
      image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b",
      nutrition: { calories: 310, protein: 12, carbs: 45, fat: 9 },
      createdBy: creator._id,
    },
    {
      title: "Molten Dark Chocolate Fondant",
      description: "A restaurant-classic dessert with a rich, oozing center — deceptively simple to make at home.",
      ingredients: [
        { name: "dark chocolate", quantity: "150g" },
        { name: "butter", quantity: "100g" },
        { name: "eggs", quantity: "2" },
        { name: "sugar", quantity: "80g" },
        { name: "flour", quantity: "50g" },
      ],
      steps: [
        { order: 1, title: "Melt chocolate and butter", content: "Melt together over a bain-marie until glossy." },
        { order: 2, title: "Whip and fold", content: "Whisk eggs and sugar until pale, fold in chocolate, then flour." },
        { order: 3, title: "Bake", content: "Bake in buttered ramekins at 200°C for exactly 10-11 minutes." },
      ],
      category: "dessert",
      cuisine: "French",
      dietType: "veg",
      prepTime: 15,
      cookingTime: 11,
      servings: 4,
      difficulty: "medium",
      image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51",
      nutrition: { calories: 380, protein: 6, carbs: 34, fat: 24 },
      createdBy: creator._id,
    },
  ]);

  await Video.create([
    {
      title: "60-second Salmon Sear",
      platform: "youtube",
      url: "https://youtube.com/shorts/example1",
      thumbnail: "https://images.unsplash.com/photo-1467003909585-2f8a72700288",
      relatedRecipe: recipes[0]._id,
    },
    {
      title: "Fried Rice in Under a Minute",
      platform: "instagram",
      url: "https://instagram.com/reel/example2",
      thumbnail: "https://images.unsplash.com/photo-1603133872878-684f208fb84b",
      relatedRecipe: recipes[1]._id,
    },
  ]);

  console.log("Seed data created. Creator login -> email: maya@kitchen.com / password: password123");
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
