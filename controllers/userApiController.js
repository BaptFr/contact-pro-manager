const userApiService = require("../services/userApiService");
const User = require("../models/user");
const bcrypt = require("bcrypt");

//GET Récupèration liste de tous les users
module.exports.getUsers = async (req, res) => {
    try{
        let users = await userApiService.getUsers({})
        return res.status(200).json({status: 300, data: users, message:'Succesfully Users Retrieved'})
    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
};

//GET Récupèration d'un user avec l'ID
module.exports.getUser = async(req, res) => {
     try {
        let user = await userApiService.getUser({ _id: req.params.id })
        return res.status(200).json({ status: 200, data: user, message: "Succesfully User Retrieved" });
    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
};

//CREATE Création d'un user
module.exports.createUser = async (req, res) => {
    try {
        // hash le mdp avec bcrypt
        let salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);

        let user = new User(req.body);
        user = await userApiService.createUser(user);
        return res.status(201).json({ status: 201, data: user, message: "Succesfully User Created" });
    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
}

//UPDATE d'un user par l'ID
module.exports.updateUser = async (req, res) => {
    try {
        // hash le mdp avec bcrypt
        let salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);

        let result = await userApiService.updateUser({ _id: req.params.id }, req.body);
        return res.status(200).json({ status: 200, data: result, message: "Succesfully User Updated" });
    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
}

//DELETE un user par l'ID
module.exports.deleteUser = async (req, res) => {
    try {
        let result = await userApiService.deleteUser({ _id: req.params.id });
        return res.status(200).json({ status: 200, data: result, message: "Succesfully User Deleted" });
    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
}