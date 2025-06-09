"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../middleware/auth");
const tasksControllers_1 = require("../controllers/tasksControllers");
const userRoutes_1 = __importDefault(require("./userRoutes"));
// Middleware para proteger todas as rotas abaixo
userRoutes_1.default.use(auth_1.verifyToken);
// GET - Listar todas as tarefas do usuário
userRoutes_1.default.get("/", tasksControllers_1.getAllTasks);
// POST - Criar nova tarefa
userRoutes_1.default.post("/", tasksControllers_1.createTask);
// DELETE - Apagar uma tarefa do usuário
userRoutes_1.default.delete("/:id", tasksControllers_1.deleteTask);
// PUT - Atualizar uma tarefa do usuário
userRoutes_1.default.put("/:id", tasksControllers_1.updateTask);
exports.default = userRoutes_1.default;
