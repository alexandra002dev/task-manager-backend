import express from "express";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import cors from "cors";
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
// Caso queira permitir só o frontend:
server.use(cors());
// Importa as rotas
server.get("/", (req, res) => {
    res.json({ message: "Task Manager API is running!" });
});
server.use("/api", userRoutes);
server.use("/api/tasks", taskRoutes);
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
export default server;
//# sourceMappingURL=server.js.map