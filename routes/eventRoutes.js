const express = require('express');
const router = express.Router();
const { createEvent, renderCreateEventPage } = require('../controllers/eventController');

router.post('/create', createEvent);

router.get('/create', renderCreateEventPage);

module.exports = router;
