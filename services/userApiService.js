const User = require("../models/user");

//Récupère la liste des users
module.exports.getUsers = async (query) => {
    try {
        let users = await User.find(query);
        return users;
    } catch (error) {
        // Log Errors
        throw Error('Error while query all Users : ' + error);
    }
}

//Récupère un user 
module.exports.getUser = async (query) => {
    try {
        let user = await User.findOne(query).populate('contacts');
        return user;
    } catch (error) {
        // Log Errors
        throw Error('Error while query one User : ' + error);
    }
}

//Créer un user
module.exports.createUser = async (user) => {
    try {
        return await user.save();
    } catch (error) {
        // Log Errors
        throw Error('Error while save User : ' + error);
    }
}

//UPDATE un user 
module.exports.updateUser = async (query, user) => {
    try {
        return await User.updateOne(query, user);
    } catch (error) {
        // Log Errors
        throw Error('Error while update User : ' + error);
    }
}

//DELETE un user
module.exports.deleteUser = async(query) =>{
    try{
        return await User.deleteOne(query);
    }catch(error) {
        //Log errors
        throw Error('Error while delete User:' + e);
    }
}