
const contactApiService = require("../services/contactApiService");
const Contact = require("../models/contact");

//GET Récupère liste des contact
module.exports.getContacts = async (req, res) => {
    try {
        let contacts = await contactApiService.getContacts({})
        return res.status(200).json({ status: 200, data: contacts, message: "Succesfully Contacts Retrieved" });
    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
};

//GET Récupère un contact avec l'ID
module.exports.getContact = async (req, res) => {
    try {
        let contact = await contactApiService.getContact({_id: req.params.id})
        return res.status(200).json({ status: 200, data: contact, message: "Succesfully Contact Retrieved" });
    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
};

//CREATE un contact
module.exports.createContact = async (req, res) => {
    try {
        let contact = new Task(req.body)
        contact = await contactApiService.createContact(contact)
        return res.status(201).json({ status: 201, data: contact, message: "Succesfully Contact Saved" });
    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
}

//UPDATE un contact par l'ID
module.exports.updateContact = async (req, res) => {
    try {
        let result = await contactApiService.updateUser({_id: req.params.id}, req.body)
        return res.status(200).json({ status: 200, data: result, message: "Succesfully Contact Updated" });
    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
}

//DELETE un contact avec l'ID
module.exports.deleteContact = async (req, res) => {
    try {
        let result = await contactApiService.deleteUser({_id: req.params.id})
        return res.status(200).json({ status: 200, data: result, message: "Succesfully Contact Deleted" });
    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
}
