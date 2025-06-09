const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
import bcrypt from "bcrypt";
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET não está definido nas variáveis de ambiente");
}
export const userCadastro = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new Error("Usuário já cadastrado");
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o usuário
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Oculta a senha da resposta
    const { password: _, ...userWithoutPassword } = newUser;
    return newUser;
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    throw error; // Re-lançar o erro para o controller tratar
  }
};
export const userLogin = async (email: string, password: string) => {
  // Verifica se o usuário existe
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      name: true,
      id: true,
      email: true,
      password: true,
    },
  });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }
  // Compara a senha
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error("Senha incorreta");
  }
  // Gera o token
  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });
  // Retorna o token
  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};
