import express from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "../generated/prisma";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { login, userCadastro } from "../controllers/userControllers";

const router = express.Router();

dotenv.config();

// Rota de cadastro
router.post("/register", userCadastro);

// Rota de login
router.post("/login", login);

export default router;
