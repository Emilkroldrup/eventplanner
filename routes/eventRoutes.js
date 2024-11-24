const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');


router.get('/events', eventController.getEvents);
router.post('/newevent', eventController.createEvent);
router.put('/updateevent', eventController.updateEvent);
router.delete('/deleteevent', eventController.deleteEvent);

module.exports = router;