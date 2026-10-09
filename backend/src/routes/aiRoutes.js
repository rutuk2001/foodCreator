import express from "express";
import { suggestRecipes } from "../controllers/aiController.js";

const router = express.Router();

router.post("/suggest", suggestRecipes);

export default router;
