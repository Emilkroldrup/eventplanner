const { fetchEventsFromAPI } = require('../models/EventsModel');
const asyncHandler = require('express-async-handler');
const eventModel = require('../models/Event');
const userModel = require('../models/User');

// Render the "Create Event" page
exports.renderCreateEventPage = (req, res) => {
  res.render('createEvent', {
    pageTitle: 'Create Event',
  });
};

exports.fetchEvents = async (query = "Koncerter i København") => {
    try {
        const events = await fetchEventsFromAPI(query);
        return events;
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
};


exports.getEvents = asyncHandler(async (req, res) => {
    const query = req.query.q || "Koncerter i København";
    const events = await exports.fetchEvents(query); // Use the reusable function
    res.render('partials/events', { events });
});

// Create an event
exports.createEvent = asyncHandler(async (req, res) => {
    const newEvent = new eventModel(req.body);
    const user = await userModel.findOne({ email: req.body.eventManager.email });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    await newEvent.save();
    return res.status(201).json({ message: 'Event has been created', newEvent });
});


// Update an event
exports.updateEvent = asyncHandler (async (req,res) => {
    const { id, ...updateFields } = req.body;

    if (updateFields.eventManager && updateFields.eventManager.email) {
        const user = await userModel.findOne({ email: updateFields.eventManager.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
    }

    const event = await eventModel.findOneAndUpdate(
        {_id: id},
        updateFields
    );
    if (!event) {
        return res.status(404).json({ message: 'Event not found or user not authorized to update this event' });
    }
    return res.status(200).json({ message: 'Event updated successfully', event }
    )
});

// Delete an event
exports.deleteEvent = asyncHandler(async (req, res) => {
    const eventId = req.body.id;
    const email = req.body.email;
    // Deletes an event from the database
    const event = await eventModel.findOneAndDelete({
        _id: eventId,
        'eventManager.email': email
    });
    if (!event) {
        return res.status(404).json({ message: 'Event not found or user not authorized to delete this event' })
    }
    return res.status(200).json({ message: 'Event deleted successfully', event })
});

