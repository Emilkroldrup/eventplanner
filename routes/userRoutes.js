const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users', userController.getUser);
router.post('/', userController.createUser);
router.delete('/deleteuser', userController.deleteUser);
router.put('/updateuser', userController.updateUser);


module.exports = router;