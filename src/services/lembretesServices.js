const prisma = require("@prisma/client");
const prisma = new PrismaClient();

const getAlllembretes = async (userId) => {
  return await prisma.lembretes.findMany({
    where: { userId },
  });
};

const getLembretesById = async (id, userId) => {
  return await prisma.lembretes.findUnique({
    where: { id: Number(id), userId },
  });
};

const getLembretesProximos7Dias = async (userId) => {
  const hoje = new Date();
  const daqui7dias = new Date();
  daqui7dias.setDate(hoje.getDate() + 7);

  return await prisma.lembretes.findMany({
    where: {
      userId,
      data: { gte: hoje, lte: daqui7dias },
    },
  });
};

const createLembretes = async (lembreteData, userId) => {
  const { nome, descricao, data, contactoId } = lembreteData;
  return await prisma.lembretes.create({
    data: { nome, descricao, data: new Date(data), contactoId, userId },
  });
};

const updateLembte = async (lembreteData, id, userId) => {
  const { nome, descricao, data } = lembreteData;
  return await prisma.lembretes.update({
    where: { id: Number(id), userId },
    data: { nome, descricao, data: new Date(data) },
  });
};

const deleteLembrete = async (id, userId) => {
  const existeLembrete = await prisma.lembretes.findUnique({
    where: { id: Number(id), userId },
  });

  if (!existeLembrete) {
    const erro = new Error("ID não encontrado");
    erro.status = 404;
    throw erro;
  }

  return await prisma.lembretes.delete({
    where: { id: Number(id), userId },
  });
};

const getLembretesByContacto = async (contactoId, userId) => {
  return await prisma.lembretes.findMany({
    where: { contactoId: Number(contactoId), userId },
  });
};

module.exports = {
  getAlllembretes,
  getLembretesById,
  getLembretesProximos7Dias,
  getLembretesByContacto,
  createLembretes,
  updateLembte,
  deleteLembrete,
};