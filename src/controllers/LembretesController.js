const lembretesServices = require ("../services/lembretesServices")

const getAll = async (req, res, next) => {
    try{
        const lembretes = await lembretesServices.getAlllembretes();
    res.status(200).json(lembretes);
  } catch (err) {
    next(err);
  }
};

const getAllById = async (req, res, next) => {
    try{
        const lembretes = await lembretesServices.getLembretesById (req.params.id);
    if (!lembretes) {
      return res.status(404).json({ message: "Lembrete não encontrado" });
    }
        res.status(200).json(lembretes);
    } catch (err){
        next(err);
    }
}

const create = async (req, res, next) => {
    try{
        const newLembrete = await lembretesServices.createLembretes(req.body);
        return res.status(201).json(newLembrete);
    }catch (err){
        if(err.status === 400){
            return res.status(400).json({ message: err.message});
        }
        next(err);
    }
};

const update = async (req, res, next) => {
    try{
        const updateThisLembte = await lembretesServices.updateLembte(req.body, req.params.id,);
        return res.status(200).json(updateThisLembte);
    } catch (err){
        if(err.status === 400){
            return res.status(400).json({ message: err.message});
        }
        next(err);
    }
};


const remove = async (req, res, next) => {
    try{
        const deleteLembrete = await lembretesServices.deleteLembrete(req.params.id,);
        return res.status(204).send();
    } catch (err){
        if(err.status === 400){
            return res.status(400).json({ message: err.message});
        }
        next(err);
    }
};

const get7dias = async (req, res, next) => {
    try{
        const getAlllembretes7dias = await lembretesServices.getLembretesProximos7Dias();
    res.status(200).json(getAlllembretes7dias);
  } catch (err) {
    next(err);
  }
};

module.exports = {
    getAll,
    getAllById,
    create,
    update,
    remove,
    get7dias,
};