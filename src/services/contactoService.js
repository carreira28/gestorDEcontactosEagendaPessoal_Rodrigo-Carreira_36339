const prisma = require("../prisma/client");

const getAllContactos = async () => {
  return await prisma.Contacto.findMany();
};

const getContactoById = async (id) => {
  return await prisma.Contacto.findUnique({
    where: { id: Number(id) },
  });
};

const createContacto = async (data, file) => {
  const { nome, email, telefone, notas, groupId } = data;

  const existeEmail = await prisma.Contacto.findUnique({
    where: { email },
  });

  if (existeEmail) {
    const erro = new Error("Email já existe");
    erro.status = 400;
    throw erro;
  }

  return await prisma.Contacto.create({
    data: {
      nome,
      email,
      telefone,
      notas,
      groupId: groupId ? Number(groupId) : null,
      foto: file ? `/photos/${file.filename}` : null,
    },
  });
};

//! Atualizar o PUT (lógica de foto pendente)
const updateContacto = async (id, data) => {
  const { nome, email, telefone, notas, groupId } = data;

  return await prisma.Contacto.update({
    where: { id: Number(id) },
    data: {
      nome,
      email,
      telefone,
      notas,
      groupId: groupId ? Number(groupId) : null,
    },
  });
};

const deleteContacto = async (id) => {
  const existeContacto = await prisma.Contacto.findUnique({
    where: { id: Number(id) },
  });

  if (!existeContacto) {
    const erro = new Error("ID não encontrado");
    erro.status = 404;
    throw erro;
  }

  return await prisma.Contacto.delete({
    where: { id: Number(id) },
  });
};

module.exports = {
  getAllContactos,
  getContactoById,
  createContacto,
  updateContacto,
  deleteContacto,
};
