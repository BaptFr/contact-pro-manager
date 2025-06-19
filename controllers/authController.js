const authService = require('../services/authService');
const Contact = require('../models/contact');
const contactService = require('../services/contactApiService');


//RENDU Page de connection
module.exports.showLoginPage = (req, res) => {
    res.render('connection', {message : ''});
};


//AUTHENTIFICATION
module.exports.login = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await authService.authenticate( email, password);
        if(!user) {
            return res.render('connection', { message: "Combinaison d'Email et de Mot de passe incorrecte"});
        }
        //Création Session maintien de connection
        req.session.user = {
            _id: user._id,
            email: user.email,
            lastName: user.lastName,
            firstName: user.firstName
        };
        //Redirection
        req.session.save(() => {
            res.redirect('/home');
        });
    }catch(error){
        res.status(400).json({ status: 400, message: error.message });
    }
};


//RENDU HomePage après authentification
module.exports.showHomePage = async (req, res) => {
     try {
        const contacts = await contactService.getContacts({ user: req.session.user._id});
        res.render('home', { user: req.session.user, contacts });
    } catch (error) {
        res.status(500).send('Erreur lors de la récupération des contacts');
    }
};
