const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// GET - Listar todas as tarefas do usuário
export const getTasks = async (userId) => {
    try {
        console.log("UserId do token:", userId); // Para debug
        const tasks = await prisma.task.findMany({
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
};
// POST - Criar nova tarefa
export const createTask = async (title, userId) => {
    try {
        // Validação
        if (!title) {
            return;
        }
        if (!userId) {
            return;
        }
        const newTask = await prisma.task.create({
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
};
// DELETE - Apagar uma tarefa do usuário
export const deleteTask = async (taskId, userId) => {
    try {
        // Converter string para número
        const taskIdNumber = parseInt(taskId);
        // Verifica se a tarefa pertence ao usuário logado
        const task = await prisma.task.findUnique({
            where: { id: taskIdNumber },
        });
        if (!task) {
            throw new Error("Tarefa não encontrada");
        }
        if (task.userId !== userId) {
            throw new Error("Você não tem permissão para deletar esta tarefa");
        }
        await prisma.task.delete({
            where: { id: taskIdNumber },
        });
    }
    catch (error) {
        console.error("Erro ao deletar task:", error);
        throw new Error("Erro ao deletar task");
    }
};
// PUT - Atualizar uma tarefa do usuário
export const updateTask = async (taskId, title, completed, userId) => {
    try {
        // Converter string para número
        const taskIdNumber = parseInt(taskId);
        // 1. Busca a tarefa pelo ID
        const task = await prisma.task.findUnique({
            where: { id: taskIdNumber },
        });
        if (!task) {
            // Se a tarefa não for encontrada
            throw new Error("Tarefa não encontrada");
        }
        if (task.userId !== userId) {
            throw new Error("Você não tem permissão para atualizar esta tarefa");
        }
        await prisma.task.update({
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
};
//# sourceMappingURL=tasks.js.map