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
    const { nome, descricao, data, contactoId } = lembreteData;

    return await prisma.lembretes.create({
        data: { nome, descricao, data:  new Date(data), contactoId },
    });
};

const updateLembte = async (lembreteData, id) => {
    const { nome, descricao, data } = lembreteData;

    return await prisma.lembretes.update({
        where: { id: Number(id)},
        data: {  nome, descricao, data: new Date(data)},
    });
};

const deleteLembrete = async (id) => {
    const existeLembrete = await prisma.lembretes.findUnique({
    where: { id: Number(id) },
  });

  if (!existeLembrete) {
    const erro = new Error("ID não encontrado");
    erro.status = 404;
    throw erro;
  }
    return await prisma.lembretes.delete({
        where: { id: Number(id)},
    });
};

module.exports = {
    getAlllembretes,
    getLembretesById,
    createLembretes,
    updateLembte,
    deleteLembrete,
};