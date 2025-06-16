const authService = require('../services/authService');
const Contact = require('../models/contact');


exports.showLoginPage = (req, res) => {
    res.render('connection', {message : ''});
};


exports.login = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user= await authService.authenticate( email, password);
        if(!user) {
            return res.render('connection', { message: "Combinaison d'Email et de Mot de passe incorrecte"});
        }
        //Création Session
        req.session.user = {
            id: user._id,
            email: user.email,
            lastName: user.lastName,
            firstName: user.firstName
        };
        //Redirection
        res.redirect('/');
    }catch(error){
        res.status(400).json({ status: 400, message: error.message });
    }
};


exports.showHomePage = async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.session.user.id });
        res.render('home', {
            user: req.session.user,
            contacts
        });
    } catch (error) {
        res.status(500).send('Erreur lors de la récupération des contacts');
    }
};
