import express from "express";
import { submitContact, getContacts } from "../controllers/contactController.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", submitContact);
router.get("/", protect, restrictTo("creator", "admin"), getContacts);

export default router;
