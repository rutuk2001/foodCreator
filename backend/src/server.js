import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";

import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import authRoutes from "./routes/authRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Security & parsing middleware
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));

// Basic rate limiting on the public API
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 300 });
app.use("/api", limiter);

// Health check
app.get("/api/health", (req, res) => res.json({ success: true, message: "API is running" }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/ai", aiRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`));
