const contactoService = require("../services/contactoService");

const getAll = async (req, res, next) => {
  try {
    const contactos = await contactoService.getAllContactos();
    res.status(200).json(contactos);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const contacto = await contactoService.getContactoById(req.params.id);
    if (!contacto) {
      return res.status(404).json({ message: "Contacto não encontrado" });
    }
    res.status(200).json(contacto);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const newContacto = await contactoService.createContacto(req.body, req.file);
    res.status(201).json(newContacto);
  } catch (err) {
    if (err.status === 400) {
      return res.status(400).json({ message: err.message });
    }
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const updatedContacto = await contactoService.updateContacto(req.params.id, req.body, req.file);
    res.status(200).json(updatedContacto);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const apgarLembrete = await contactoService.deleteContacto(req.params.id, req.body, req.file);
    res.status(204).send();
  } catch (err) {
    if (err.status === 404) {
      return res.status(404).json({ message: err.message });
    }
    next(err);
  }
};

const searchLembresteBYContacto = async (req, res, next) => {
  try {
    const data = await contactoService.ContactoLembrete(req.params.id);

    return res.json(data);
  } catch (err) {
    if (err.status === 400) {
      return res.status(400).json({ message: err.message });
    }
    next(err);
  }
};

const searchCont = async (req, res, next) => {
  try {
    const contactos = await contactoService.searchContactos(req.query);
    res.status(200).json(contactos);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getById, create, update, remove, searchLembresteBYContacto, searchCont};
