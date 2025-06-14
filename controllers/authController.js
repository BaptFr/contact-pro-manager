const authService = require('../services/authService');



exports.showLoginPage = (req, res) => {
    res.render('connection', {message : ''});
};


exports.login = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user= await authService.authenticate( email, password);
        if(!user) {
            return res.rend('connection', { message: 'Incorrect Email or password'});
        }
        //Création Session
        req.session.user = {
            id: user._id,
            email: user.email,
            lastName: user.lastName,
            firstName: user.firstName
        };
        //Redirection
        res.redirect('/home');
    }catch(error){
        res.status(400).json({ status: 400, message: error.message });
    }
};


exports.showHomePage = (req, res) => {
    res.render('home', { user: req.session.user });
};