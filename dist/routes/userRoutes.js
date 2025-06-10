"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const userControllers_1 = require("../controllers/userControllers");
const router = express_1.default.Router();
dotenv_1.default.config();
// Rota de cadastro
router.post("/register", userControllers_1.userCadastro);
// Rota de login
router.post("/login", userControllers_1.login);
exports.default = router;
