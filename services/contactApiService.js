const Contact = require("../models/contact");
const User = require("../models/user");

//Récupère liste de tous les contacts
module.exports.getContacts = async (query) => {

    try {
        var contacts = await Contact.find(query);
        return contacts;
    } catch(error) {
        // Log Errors
        throw Error(`Error while query all Contacts : ${error.message}`)
    }
}

//Récupère x1 contact
module.exports.getContact = async (query) => {

    try {
        var contact = await Contact.findOne(query).populate('user');
        return contact;
    } catch(error) {
        // Log Errors
        throw Error(`Error while query one Contact : ${error.message}`)
    }
}

//CREATE contact
module.exports.createContact = async (contact) => {

    try {
        var contact = await contact.save();
        console.log(contact);
        await User.findByIdAndUpdate({_id: contact.user}, { $push: { contacts: contact._id } });
        return contact;
    } catch(error) {
        // Log Errors
        throw Error(`Error while save Contact : ${error.message}`)
    }
}

//UPDATE x1 contact
module.exports.updateContact = async (query, contact) => {
    try {
        return await Contact.updateOne(query, contact);
    } catch(error) {
        // Log Errors
        throw Error(`Error while update Contact : ${error.message}`)
    }
}

//DELETE un contact
module.exports.deleteContact = async (query) => {
    try {
        return await Contact.deleteOne(query);
    } catch(error) {
        // Log Errors
        throw Error(`Error while delete Contact : ${error.message}`)
    }          
}