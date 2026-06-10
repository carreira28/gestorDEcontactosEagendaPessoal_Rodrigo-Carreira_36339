const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../prisma/client");

const signup = async (data) => {
    const { name, email, password } = data;
    
    const existeUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existeUser) {
        const error = new Error("Email já registado");
        error.status = 400;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: { name, email, password: hashedPassword },
    });

    return { id: newUser.id, name: newUser.name, email: newUser.email };
};

const signin = async (data) => {
    const { email, password } = data;

    const existeUser = await prisma.user.findUnique({
        where: { email },
    });

    if (!existeUser) {
        const error = new Error("Email inválido!");
        error.status = 400;
        throw error;
    }

    const validarPassword = await bcrypt.compare(password, existeUser.password);

    if (!validarPassword) {
        const error = new Error("Password inválida!");
        error.status = 400;
        throw error;
    }

    const token = jwt.sign(
        { id: existeUser.id, email: existeUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    return { token };
};

const ListarUser = async () => {
    return await prisma.user.findMany();
};

module.exports = { signup, signin, ListarUser };