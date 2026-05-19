const prisma = require("../prisma/client");

const getAllGroups = async () => {
    return await prisma.Group.findMany();
};

const getGroupById = async (id) => {
    return await prisma.Group.findUnique({
        where: {id: Number(id)},
    });
};

const createGroup = async (data) => {
    const { nome, userId } = data;

    return await prisma.Group.create({
        data: { nome, userId },
    });
};


const updateGroup = async (data, id) => {
    const { nome, userId } = data;

    return await prisma.Group.update({
        where: { id: Number(id)},
        data: { nome, userId },
    });
};


const deleteGroup = async (id) => {
    return await prisma.Group.delete({
        where: {id: Number(id)},
    });
};

const GroupContacto = async (id) => {
    return prisma.Group.findUnique({
        where: {id: Number(id)},
        include: { contactos: true},
    });
};



module.exports = {
    getAllGroups,
    getGroupById,
    createGroup,
    updateGroup,
    deleteGroup,
    GroupContacto,
}