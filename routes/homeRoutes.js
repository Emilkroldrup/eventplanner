const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const authenticateUser = require('../middleware/authMiddleware');

router.get('/', homeController.getHome);
router.get('/profile', homeController.getProfilePage);

module.exports = router;
