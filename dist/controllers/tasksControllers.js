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
exports.updateTask = exports.deleteTask = exports.createTask = exports.getAllTasks = void 0;
const tasksControllers = __importStar(require("../models/tasks"));
// GET - Listar todas as tarefas do usuário
const getAllTasks = async (req, res) => {
    let tasks = await tasksControllers.getTasks(req.userId);
    res.json(tasks);
};
exports.getAllTasks = getAllTasks;
// POST - Criar nova tarefa
const createTask = async (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ error: "Título é obrigatório" });
    }
    const newTask = await tasksControllers.createTask(title, req.userId);
    res.json(newTask);
};
exports.createTask = createTask;
// DELETE - Apagar uma tarefa do usuário
const deleteTask = async (req, res) => {
    const { id } = req.params;
    await tasksControllers.deleteTask(id, req.userId);
    res.json({ message: "Task deleted" });
};
exports.deleteTask = deleteTask;
// PUT - Atualizar uma tarefa do usuário
const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const { completed } = req.body;
    await tasksControllers.updateTask(id, title, completed, req.userId);
    res.json({ message: "Task updated" });
};
exports.updateTask = updateTask;
