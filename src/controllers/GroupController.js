const GroupService = require("../services/GroupService");

const getAll = async (req, res, next) => {
  try {
    const Groups = await GroupService.getAllGroups(req.user.id);
    return res.status(200).json(Groups);
  } catch (err) { next(err); }
};

const getAllById = async (req, res, next) => {
  try {
    const Group = await GroupService.getGroupById(req.params.id, req.user.id);
    if (!Group) return res.status(404).json({ message: "Grupo não encontrado" });
    return res.status(200).json(Group);
  } catch(err) { next(err); }
};

const create = async (req, res, next) => {
  try {
    const newGroup = await GroupService.createGroup(req.body, req.user.id);
    return res.status(201).json(newGroup);
  } catch(err) {
    if(err.status === 400) return res.status(400).json({ message: err.message });
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const updated = await GroupService.updateGroup(req.body, req.params.id, req.user.id);
    return res.status(200).json(updated);
  } catch (err) {
    if(err.status === 400) return res.status(400).json({ message: err.message });
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await GroupService.deleteGroup(req.params.id, req.user.id);
    return res.status(200).send();
  } catch(err) {
    if(err.status === 400) return res.status(400).json({ message: err.message });
    next(err);
  }
};

const searchContactosByGroup = async (req, res, next) => {
  try {
    const search = await GroupService.GroupContacto(req.params.id, req.user.id);
    return res.status(200).json(search);
  } catch(err) {
    if(err.status === 400) return res.status(400).json({ message: err.message });
    next(err);
  }
};
module.exports = {
    getAll,
    getAllById,
    create,
    update,
    remove,
    searchContactosByGroup,
}