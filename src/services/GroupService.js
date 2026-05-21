const prisma = require("../prisma/client");

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