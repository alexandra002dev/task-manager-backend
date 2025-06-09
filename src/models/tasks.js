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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTask = exports.deleteTask = exports.createTask = exports.getTasks = void 0;
const prisma_1 = require("../generated/prisma");
const prisma = new prisma_1.PrismaClient();
// GET - Listar todas as tarefas do usuário
const getTasks = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("UserId do token:", userId); // Para debug
        const tasks = yield prisma.task.findMany({
            where: {
                userId: userId, // Vem do middleware de auth
            },
            orderBy: {
                createdAt: "desc",
            },
            select: {
                id: true,
                title: true,
                done: true,
                createdAt: true,
                // Inclui os dados do usuário
                user: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        return tasks;
    }
    catch (error) {
        console.error("Erro ao buscar tasks:", error);
        throw new Error("Erro ao buscar tasks");
    }
});
exports.getTasks = getTasks;
// POST - Criar nova tarefa
const createTask = (title, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validação
        if (!title) {
            return;
        }
        if (!userId) {
            return;
        }
        const newTask = yield prisma.task.create({
            data: {
                title,
                userId: userId, // Vem do middleware de auth
            },
        });
        return newTask;
    }
    catch (error) {
        console.error("Erro ao criar task:", error);
        throw new Error("Erro ao criar task");
    }
});
exports.createTask = createTask;
// DELETE - Apagar uma tarefa do usuário
const deleteTask = (taskId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Converter string para número
        const taskIdNumber = parseInt(taskId);
        // Verifica se a tarefa pertence ao usuário logado
        const task = yield prisma.task.findUnique({
            where: { id: taskIdNumber },
        });
        if (!task) {
            throw new Error("Tarefa não encontrada");
        }
        if (task.userId !== userId) {
            throw new Error("Você não tem permissão para deletar esta tarefa");
        }
        yield prisma.task.delete({
            where: { id: taskIdNumber },
        });
    }
    catch (error) {
        console.error("Erro ao deletar task:", error);
        throw new Error("Erro ao deletar task");
    }
});
exports.deleteTask = deleteTask;
// PUT - Atualizar uma tarefa do usuário
const updateTask = (taskId, title, completed, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Converter string para número
        const taskIdNumber = parseInt(taskId);
        // 1. Busca a tarefa pelo ID
        const task = yield prisma.task.findUnique({
            where: { id: taskIdNumber },
        });
        if (!task) {
            // Se a tarefa não for encontrada
            throw new Error("Tarefa não encontrada");
        }
        if (task.userId !== userId) {
            throw new Error("Você não tem permissão para atualizar esta tarefa");
        }
        yield prisma.task.update({
            where: { id: taskIdNumber },
            data: {
                title,
                done: completed,
            },
        });
    }
    catch (error) {
        console.error("Erro ao atualizar task:", error);
        throw new Error("Erro ao atualizar task");
    }
});
exports.updateTask = updateTask;
