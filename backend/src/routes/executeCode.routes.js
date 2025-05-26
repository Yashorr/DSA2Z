import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { executeCode, runCode } from '../controllers/executeCode.controller.js';

const executionRoutes = express.Router();

executionRoutes.post("/",authMiddleware,executeCode);

executionRoutes.post("/run",authMiddleware,runCode)

export default executionRoutes;