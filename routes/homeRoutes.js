const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const eventsController = require('../controllers/eventController');



router.get('/', homeController.getHome);



module.exports = router;
