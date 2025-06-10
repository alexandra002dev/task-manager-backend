"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
const server = (0, express_1.default)();
const cors = require("cors");
server.use(express_1.default.json());
server.use(express_1.default.urlencoded({ extended: true }));
// Caso queira permitir só o frontend:
server.use(cors());
// Importa as rotas
server.get("/", (req, res) => {
    res.json({ message: "Task Manager API is running!" });
});
server.use("/api", userRoutes_1.default);
server.use("/api/tasks", taskRoutes_1.default);
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
exports.default = server;
