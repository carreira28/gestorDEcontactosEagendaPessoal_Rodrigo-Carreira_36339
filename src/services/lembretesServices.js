const prisma = require("../prisma/client");

const getAlllembretes = async () => {
    return await prisma.lembretes.findMany();
};

const getLembretesById = async (id) => {
    return await prisma.lembretes.findUnique({
        where: { id: Number(id)},
    });
};

const createLembretes = async (lembreteData) => {
    const { nome, descricao, data,contactoId } = lembreteData;

    return await prisma.lembretes.create({
        data: { nome, descricao, data:  new Date(data), contactoId },
    });
};


module.exports = {
    getAlllembretes,
    getLembretesById,
    createLembretes,
};