import * as Models from "../models/users.js";
export const userCadastro = async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body);
    // Verifica se o usuário já existe
    if (!name || !email || !password) {
        res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
        return;
    }
    const newUser = await Models.userCadastro(name, email, password);
    res.status(201).json(newUser);
};
// Rota de login
export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
        return;
    }
    const result = await Models.userLogin(email, password);
    res.status(200).json({
        token: result.token,
        name: result.user.name,
        email: result.user.email,
        id: result.user.id,
    });
};
//# sourceMappingURL=userControllers.js.map