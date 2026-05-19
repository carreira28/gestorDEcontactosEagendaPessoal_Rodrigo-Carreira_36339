const lembretesServices = require ("../services/lembretesServices")

const getAll = async (req, res, next) => {
    try{
        const lembretes = await lembretesServices.getAlllembretes();
    res.status(200).json(lembretes);
  } catch (err) {
    next(err);
  }
};

//! get id

const create = async (req, res, next) => {
    try{
        const newLembrete = await lembretesServices.createLembretes(req.body);
        return res.status(201).json(newLembrete);
    }catch (err){
        if(err === 400){
            return res.status(400).json({ message: err.message});
        }
        next(err);
    }
};



module.exports = {
    getAll,
    
    create,
};