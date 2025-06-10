import { verifyToken } from "../middleware/auth.js";
import { createTask, deleteTask, getAllTasks, updateTask, } from "../controllers/tasksControllers.js";
import router from "./userRoutes.js";
// Middleware para proteger todas as rotas abaixo
router.use(verifyToken);
// GET - Listar todas as tarefas do usuário
router.get("/", getAllTasks);
// POST - Criar nova tarefa
router.post("/", createTask);
// DELETE - Apagar uma tarefa do usuário
router.delete("/:id", deleteTask);
// PUT - Atualizar uma tarefa do usuário
router.put("/:id", updateTask);
export default router;
//# sourceMappingURL=taskRoutes.js.map