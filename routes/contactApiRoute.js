const express = require('express');
const router = express.Router();
const contactApiController = require('../controllers/contactApiController');

router.get('/contacts', contactApiController.getContacts);
router.get('/:id', contactApiController.getContact);
router.post('/', contactApiController.createContact);
router.put('/:id', contactApiController.updateContact);
router.delete('/:id', contactApiController.deleteContact);

module.exports = router;


