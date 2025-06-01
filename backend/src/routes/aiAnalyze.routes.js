import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { aiAnalyze } from "../controllers/aiAnalyze.controller.js";

const aiAnalyzeRoutes = express.Router();

aiAnalyzeRoutes.post("/",authMiddleware,aiAnalyze);


export default aiAnalyzeRoutes;