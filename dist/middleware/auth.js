import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN
        if (!token) {
            res.status(401).json({ error: "Token não fornecido" });
            return;
        }
        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            res.status(500).json({ error: "Configuração do servidor inválida" });
            return;
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        req.userEmail = decoded.email;
        next();
    }
    catch (error) {
        console.error("Erro na verificação do token:", error);
        res.status(403).json({ error: "Token inválido" });
        return;
    }
};
//# sourceMappingURL=auth.js.map