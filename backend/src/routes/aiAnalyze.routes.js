import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { aiAnalyze } from "../controllers/aiAnalyze.controller.js";
import { checkTokens } from "../middleware/tokens.middleware.js";

const aiAnalyzeRoutes = express.Router();

aiAnalyzeRoutes.post("/",authMiddleware,checkTokens,aiAnalyze);


export default aiAnalyzeRoutes;