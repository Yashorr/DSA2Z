import express from "express";
import { getMe, login, logout, register } from "../controllers/auth.controller.js";

const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.get("/get-me" , getMe);


export default authRoutes;