"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.userCadastro = void 0;
const Models = __importStar(require("../models/user"));
const userCadastro = async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body);
    // Verifica se o usuário já existe
    if (!name || !email || !password) {
        res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
        return;
    }
    const newUser = await Models.userCadastro(name, email, password);
    res.status(201).json(newUser);
};
exports.userCadastro = userCadastro;
// Rota de login
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
        return;
    }
    const result = await Models.userLogin(email, password);
    res.status(200).json({
        token: result.token,
        name: result.user.name,
        email: result.user.email,
        id: result.user.id,
    });
};
exports.login = login;
