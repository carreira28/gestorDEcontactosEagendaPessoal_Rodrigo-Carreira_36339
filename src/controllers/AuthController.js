const AuthServices = require ("../services/AuthServices");

const signup = async (req, res, next) => {
    try{
        const { name, email, password } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Campos 'name', 'email' e 'password' são obrigatórios" });
        }

        const user = await AuthServices.signup(req.body);
        return res.status(201).json(user);
    } catch(err){
        if (err.status === 400){
            return res.status(400).json({ message: err.message });
        }
        next(err);
    }
};

module.exports = {
    signup,
}