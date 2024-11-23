const { fetchEventsFromAPI } = require('../models/EventsModel');
const asyncHandler = require('express-async-handler');
const eventModel = require('../models/Event');
const userModel = require('../models/User');

exports.getEvents = asyncHandler(async(req, res) => {
    const query = req.query.q || "Koncerter i København";
        const events = await fetchEventsFromAPI (query);
        res.render('partials/events', { events });
});

exports.createEvent = asyncHandler(async (req, res) => {
    const newEvent = new eventModel(req.body);
    const user = await userModel.findOne({ email: req.body.eventManager.email });
    if(!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    await newEvent.save();
    return res.status(201).json({ message: 'Event has been created', newEvent });
});

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

exports.deleteEvent = asyncHandler(async (req, res) => {
    const eventId = req.body.id;
    const email = req.body.email;
    const event = await eventModel.findOneAndDelete({
        _id: eventId,
        'eventManager.email': email
    });
    if (!event) {
        return res.status(404).json({ message: 'Event not found or user not authorized to delete this event' })
    }
    return res.status(200).json({ message: 'Event deleted successfully', event })
});

