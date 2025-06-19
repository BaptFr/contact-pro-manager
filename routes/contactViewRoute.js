const express = require('express');
const router = express.Router();
const contactViewController = require('../controllers/contactViewController.js');
const contactApiController = require('../controllers/contactApiController.js')

//Route afficher formulaire d'AJOUTER contact
router.get('/new', contactViewController.renderAddForm);

//Route afficher formulaire d'MODIFIER contact
router.get('/edit/:id', contactViewController.renderEditForm);
//Route Traite form MODIFIER contact (POST)
router.post('/edit/:id', contactApiController.updateContact);

//Route Traite  SUPPRIMER contact (GET)
router.get('/delete/:id', contactViewController.deleteContact);

//Route AFFICHER toutes les infos d'un contact
router.get('/:id', contactViewController.showContact);



module.exports = router;