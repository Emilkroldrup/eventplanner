const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const authenticateUser = require('../middleware/authMiddleware');
const eventController = require('../models/EventsModel');
router.get('/', homeController.getHome);
router.get('/profile', homeController.getProfilePage);

router.get('/paginated', eventController.getPaginatedEvents);

module.exports = router;
