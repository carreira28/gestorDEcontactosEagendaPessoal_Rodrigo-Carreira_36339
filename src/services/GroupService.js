const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllGroups = async (userId) => {
  return await prisma.Group.findMany({
    where: { userId },
  });
};

const getGroupById = async (id, userId) => {
  return await prisma.Group.findUnique({
    where: { id: Number(id), userId },
  });
};

const createGroup = async (data, userId) => {
  const { nome } = data;
  return await prisma.Group.create({
    data: { nome, userId },
  });
};

const updateGroup = async (data, id, userId) => {
  const { nome } = data;
  return await prisma.Group.update({
    where: { id: Number(id), userId },
    data: { nome },
  });
};

const deleteGroup = async (id, userId) => {

  const existegrupo = await prisma.Group.findUnique({
    where: {id: Number(id)},
    include: {contactos: true},
  });

  if(!existegrupo) {
    const erro = new Error("ID não encontrado");
    erro.status = 404;
    throw erro;
  }

    if (existegrupo.contactos.length > 0) {
    const erro = new Error("Este grupo tem contactos pendentes!");
    erro.status = 400;
    throw erro;
  }

  return await prisma.Group.delete({
    where: { id: Number(id), userId },
  });
};

const GroupContacto = async (id, userId) => {
  return prisma.Group.findUnique({
    where: { id: Number(id), userId },
    include: { contactos: true },
  });
};

module.exports = {
  getAllGroups,
  getGroupById,
  createGroup,
  updateGroup,
  deleteGroup,
  GroupContacto,
};