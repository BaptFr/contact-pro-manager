
const contactApiService = require("../services/contactApiService");
const Contact = require("../models/contact");

//GET Récupère liste des contacts
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
        //Vérif session user
        if (!req.session.user) {
            return res.status(401).json({ status: 401, message: "Utilisateur non connecté" });
        }
        //Ajouts manuels:
        //-user
        req.body.user = req.session.user._id;
        //-checkbox
        req.body.actif = req.body.actif === 'on';

        let contact = new Contact(req.body);
        contact = await contactApiService.createContact(contact);

        //Redirection
        return res.redirect('/');

    } catch (error) {
        console.error('Erreur lors de l’enregistrement :', error);
        return res.status(400).render('add-item', {message: "Erreur lors de l'envoi du formulaire"});

    }
}

//UPDATE un contact par l'ID
module.exports.updateContact = async (req, res) => {
    try {
        //gestion checkbox View
        req.body.actif = req.body.actif === 'on';
        let contact = new Contact(req.body);
        contact = await contactApiService.updateContact({_id: req.params.id}, req.body);
     //Redirection
        return res.redirect('/');
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

