const lembretesServices = require("../services/lembretesServices");

const getAll = async (req, res, next) => {
  try {
    const lembretes = await lembretesServices.getAlllembretes(req.user.id);
    res.status(200).json(lembretes);
  } catch (err) { next(err); }
};

const getAllById = async (req, res, next) => {
  try {
    const lembretes = await lembretesServices.getLembretesById(req.params.id, req.user.id);
    if (!lembretes) return res.status(404).json({ message: "Lembrete não encontrado" });
    res.status(200).json(lembretes);
  } catch (err) { next(err); }
};

const get7dias = async (req, res, next) => {
  try {
    const lembretes = await lembretesServices.getLembretesProximos7Dias(req.user.id);
    res.status(200).json(lembretes);
  } catch (err) { next(err); }
};

const create = async (req, res, next) => {
  try {
    const newLembrete = await lembretesServices.createLembretes(req.body, req.user.id);
    return res.status(201).json(newLembrete);
  } catch (err) {
    if(err.status === 400) return res.status(400).json({ message: err.message });
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const updated = await lembretesServices.updateLembte(req.body, req.params.id, req.user.id);
    return res.status(200).json(updated);
  } catch (err) {
    if(err.status === 400) return res.status(400).json({ message: err.message });
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await lembretesServices.deleteLembrete(req.params.id, req.user.id);
    return res.status(204).send();
  } catch (err) {
    if(err.status === 400) return res.status(400).json({ message: err.message });
    next(err);
  }
};
const getByContacto = async (req, res, next) => {
  try {
    const lembretes = await lembretesServices.getLembretesByContacto(req.params.contactoId, req.user.id);
    res.status(200).json(lembretes);
  } catch (err) { next(err); }
};

module.exports = { getAll, getAllById, get7dias, create, update, remove, getByContacto };
