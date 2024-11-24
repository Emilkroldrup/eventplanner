const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.post('/create', eventController.createEvent);

router.get('/create', eventController.renderCreateEventPage);

router.get('/', eventController.getEvents);

router.post('/', eventController.createEvent);

router.put('/', eventController.updateEvent);

router.delete('/', eventController.deleteEvent);

module.exports = router;
