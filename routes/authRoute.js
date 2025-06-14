const express = require ('express');
const router = express.Router();
const authController = require('../controllers/authController.js');
const isAuthenticated = require ('../middlewares/authMiddleware.js');


//Route page Connection form
router.get('/connection', authController.showLoginPage);
//Route traitement form
router.post('/connection', authController.login);
//Route Home après auth
router.get('/home', authController.showHomePage);

module.exports = router;
