const express = require('express');
const router = express.Router();
const authMiddleware = require ('../middlewares/authMiddleware');
const contactService = require('../services/contactApiService');

router.get('/', authMiddleware, async (req, res) => {
    try {
        const userId = req.session.user.id;
        const contacts = await contactService.getContacts({ user: userId });
        res.render('home', { user: req.session.user, contacts });
    } catch (error) {
        res.status(500).send("Erreur serveur : " + error.message);
    }
})

module.exports = router;