import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { createOrder, verifyPayment } from "../controllers/payment.controller.js";

const paymentRoutes = express.Router();

paymentRoutes.post("/create-order",authMiddleware,createOrder);
paymentRoutes.post("/verify-payment",authMiddleware,verifyPayment);



export default paymentRoutes;