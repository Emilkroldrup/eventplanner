const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Event management and operations
 */

/**
 * @swagger
  * /create:
 *   post:
 *     tags:
 *       - Events
 *     summary: Create a new event
 *     description: Add a new event to the system and assign an event manager to it.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the event
 *                 example: Music Festival
 *               city:
 *                 type: string
 *                 description: City where the event will be held
 *                 example: Copenhagen
 *               address:
 *                 type: string
 *                 description: Address for the event location
 *                 example: Tivoli Gardens
 *               eventType:
 *                 type: string
 *                 description: Type of the event
 *                 example: Concert
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 description: Start date and time of the event
 *                 example: 2023-12-10T18:00:00Z
 *               duration:
 *                 type: number
 *                 description: Duration of the event in hours
 *                 example: 4
 *               description:
 *                 type: string
 *                 description: Detailed description of the event
 *                 example: A grand music festival with international artists.
 *               ageRestriction:
 *                 type: number
 *                 description: Minimum age required for attendance
 *                 example: 18
 *               eventManager:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                     description: Email of the event manager
 *                     example: manager@example.com
 *     responses:
 *       201:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Event has been created
 *                 newEvent:
 *                   $ref: '#/components/schemas/Event'
 *       404:
 *         description: Event manager not found
 *       500:
 *         description: Internal server error
 */
router.post('/create', eventController.createEvent);

router.get('/create', eventController.renderCreateEventPage);

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - Events
 *     summary: Retrieve all events
 *     description: Fetch a list of events based on a query or location. Default query is "Koncerter i København".
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: false
 *         description: Search term to filter events.
 *     responses:
 *       200:
 *         description: A list of events successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       500:
 *         description: Server error while fetching events.
 */
router.get('/', eventController.getEvents);

// router.post('/', eventController.createEvent);

/**
 * @swagger
 * /:
 *   put:
 *     tags:
 *       - Events
 *     summary: Update an existing event
 *     description: Modify details of an event. If the event manager is updated, their email must exist in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: Event ID to update
 *                 example: 6410f8a293b90a1820c0f123
 *               title:
 *                 type: string
 *                 description: Updated event title
 *               eventManager:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                     description: Updated email of the event manager
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       404:
 *         description: Event or event manager not found
 *       500:
 *         description: Server error during update
 */
router.put('/', eventController.updateEvent);

/**
 * @swagger
 * /:
 *   delete:
 *     tags:
 *       - Events
 *     summary: Delete an event
 *     description: Remove an event from the database. Requires event ID and manager email for authentication.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID of the event to delete
 *                 example: 6410f8a293b90a1820c0f123
 *               email:
 *                 type: string
 *                 description: Email of the event manager
 *                 example: manager@example.com
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       404:
 *         description: Event not found or unauthorized request
 *       500:
 *         description: Internal server error
 */
router.delete('/', eventController.deleteEvent);

module.exports = router;
