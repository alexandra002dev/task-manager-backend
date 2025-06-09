"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = exports.userCadastro = void 0;
const prisma_1 = require("../generated/prisma");
const prisma = new prisma_1.PrismaClient();
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET não está definido nas variáveis de ambiente");
}
const userCadastro = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userExists = yield prisma.user.findUnique({
            where: { email },
        });
        if (userExists) {
            throw new Error("Usuário já cadastrado");
        }
        // Criptografa a senha
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Cria o usuário
        const newUser = yield prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        // Oculta a senha da resposta
        const { password: _ } = newUser, userWithoutPassword = __rest(newUser, ["password"]);
        return newUser;
    }
    catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        throw error; // Re-lançar o erro para o controller tratar
    }
});
exports.userCadastro = userCadastro;
const userLogin = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    // Verifica se o usuário existe
    const user = yield prisma.user.findUnique({
        where: { email },
        select: {
            name: true,
            id: true,
            email: true,
            password: true,
        },
    });
    if (!user) {
        throw new Error("Usuário não encontrado");
    }
    // Compara a senha
    const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordMatch) {
        throw new Error("Senha incorreta");
    }
    // Gera o token
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: "1h",
    });
    // Retorna o token
    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
    };
});
exports.userLogin = userLogin;
