import express from "express";
import userRoutes from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";

const server = express();
const cors = require("cors");

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Caso queira permitir só o frontend:
server.use(
  cors({
    origin: "http://localhost:3000", // ou seu domínio de produção depois
  })
);

// Importa as rotas
server.get("/", (req, res) => {
  res.json({ message: "Task Manager API is running!" });
});
server.use("/api", userRoutes);
server.use("/api/tasks", taskRoutes);
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log("server is running on port 4000");
});
export default server;
