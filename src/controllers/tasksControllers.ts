import * as tasksControllers from "../models/tasks.js";

// GET - Listar todas as tarefas do usuário
export const getAllTasks = async (req: any, res: any) => {
  let tasks = await tasksControllers.getTasks(req.userId);
  res.json(tasks);
};
// POST - Criar nova tarefa
export const createTask = async (req: any, res: any) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Título é obrigatório" });
  }
  const newTask = await tasksControllers.createTask(title, req.userId);
  res.json(newTask);
};

// DELETE - Apagar uma tarefa do usuário
export const deleteTask = async (req: any, res: any) => {
  const { id } = req.params;
  await tasksControllers.deleteTask(id, req.userId);
  res.json({ message: "Task deleted" });
};
// PUT - Atualizar uma tarefa do usuário
export const updateTask = async (req: any, res: any) => {
  const { id } = req.params;
  const { title } = req.body;
  const { completed } = req.body;
  await tasksControllers.updateTask(id, title, completed, req.userId);
  res.json({ message: "Task updated" });
};
