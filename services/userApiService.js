const express = requitre('express');
const router = express.router();


//Import controller
const useApiController = require('../controllers/userApiController');
const user = require('../models/user');

router.get('/users', userApiController.getUsers);
router.get('/:id', useApiController.getUser);
router.post('/', useApiController.createUser);
router.put('/:id', user.useApiController.updateUser);
router.delete('/:id', userApiController.deleteUser);

//Export routes 
module.exports = router;