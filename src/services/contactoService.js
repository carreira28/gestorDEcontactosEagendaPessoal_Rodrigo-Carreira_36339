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
  const { nome, email, telefone, notas, groupId, userId } = data;

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
      userId,
      groupId: groupId ? Number(groupId) : null,
      foto: file ? `/photos/${file.filename}` : null,
    },
  });
};

const updateContacto = async (id, data, file) => {
  const { nome, email, telefone, notas, groupId } = data;

  return await prisma.Contacto.update({
    where: { id: Number(id) },
    data: {
      nome,
      email,
      telefone,
      notas,
      groupId: groupId ? Number(groupId) : null,
      foto: file ? `/photos/${file.filename}` : undefined,
    },
  });
};

const deleteContacto = async (id) => {
  const existeContacto = await prisma.contacto.findUnique({
    where: { id: Number(id) },
    include: { lembretes: true },
  });

  if (!existeContacto) {
    const erro = new Error("ID não encontrado");
    erro.status = 404;
    throw erro;
  }

  if (existeContacto.lembretes.length > 0) {
    const erro = new Error("Este contacto tem lembretes pendentes!");
    erro.status = 400;
    throw erro;
  }

  return await prisma.contacto.delete({
    where: { id: Number(id) },
  });
};

const ContactoLembrete = async (id) => {
  return await prisma.contacto.findUnique({
    where: { id: Number(id)},
    include: { lembretes: true},
  });
};

const searchContactos = async (query) => {
  const { nome, email, groupId } = query;

  return await prisma.Contacto.findMany({
    where: {
      ...(nome && { nome: { contains: nome, mode: 'insensitive' } }),
      ...(email && { email: { contains: email, mode: 'insensitive' } }),
      ...(groupId && { groupId: Number(groupId) }),
    }
  });
};

module.exports = {
  getAllContactos,
  getContactoById,
  createContacto,
  updateContacto,
  deleteContacto,
  ContactoLembrete,
  searchContactos,
};
