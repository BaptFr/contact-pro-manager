const express = require('express');
const router = express.Router();
const contactViewController = require('../controllers/contactViewController.js');



router.get('/new', contactViewController.renderAddForm);

module.exports = router;