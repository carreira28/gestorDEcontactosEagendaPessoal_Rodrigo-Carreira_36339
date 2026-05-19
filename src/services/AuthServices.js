const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../prisma/client");

const signup = async (data) => {
    const { name, email, password } = data;
    
    const existeUser = await prisma.user.findUnique({
        where: { email },
    });

    if(existeUser){
        const error = new Error("Email já registado");
        err.status = 400;
        throw err;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.User.create({
        data: { name, email, password: hashedPassword},
    });

    return{ id: newUser.id, name: newUser.name, email: newUser.email};
};

const signin = async (data) => {
    const {email, password} = data; 

    
}
module.exports = {
    signup,
}