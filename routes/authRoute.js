const express = require ('express');
const router = express.Router();
const authController = require('../controllers/authController.js');
const authMiddleware = require ('../middlewares/authMiddleware');

//Condition de route
router.get('/', (req, res) => {
    if (req.session.user) {
        return res.redirect('/home');
    } else {
        return res.redirect('/connection');
    }
});


//Route page Connection form si non authentifié
router.get('/connection', (req, res) => {
    if (req.session.user) {
        return res.redirect('/home');
    }
    res.render('connection', { message: '' });
});


//Route traitement form
router.post('/connection', authController.login);

//Route Home après auth
router.get('/home', authMiddleware, authController.showHomePage);

module.exports = router;
