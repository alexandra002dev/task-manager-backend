import express from "express";
import dotenv from "dotenv";
import { login, userCadastro } from "../controllers/userControllers.js";

const router = express.Router();

dotenv.config();

// Rota de cadastro
router.post("/register", userCadastro);

// Rota de login
router.post("/login", login);

export default router;
