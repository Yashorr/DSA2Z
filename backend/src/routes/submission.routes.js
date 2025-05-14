import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getAllSubmissions, getSubmissionByProblemId, getSubmissionCount } from "../controllers/submission.controller.js";


const submissionRoutes = express.Router();

submissionRoutes.get("/get-all-submissions",authMiddleware, getAllSubmissions);
submissionRoutes.get("/get-submissions/:id", authMiddleware, getSubmissionByProblemId);
submissionRoutes.get("/get-submission-count/:id", authMiddleware, getSubmissionCount);

export default submissionRoutes;