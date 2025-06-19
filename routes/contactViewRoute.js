const express = require('express');
const router = express.Router();
const contactViewController = require('../controllers/contactViewController.js');


//Route afficher formulaire d'ajout contact
router.get('/new', contactViewController.renderAddForm);
//Route afficher toutes les infos d'un contact
router.get('/:id', contactViewController.showContact);



module.exports = router;