const { fetchEventsFromAPI } = require('../models/EventsModel');
const asyncHandler = require('express-async-handler');
const multer = require('multer');
const path = require('path');
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
    res.render('../views/partials/eventsForHome', { events });
});


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/'); // Folder where images are stored
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    },
});

const upload = multer({ storage });

exports.createEvent = [
    upload.single('event-image'), // Add multer middleware to handle image upload
    asyncHandler(async (req, res) => {
        // Check if the user exists
        const user = await userModel.findOne({ email: req.body.eventManager.email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Get the image path
        const imagePath = req.file ? `/uploads/${req.file.filename}` : '/images/defaultEvent.png'; // Use default image if no file uploaded

        // Create the event object
        const newEvent = new eventModel({
            ...req.body,
            image: imagePath, // Store the uploaded image path or default image
        });

        try {
            // Save the event to the database
            await newEvent.save();
            res.redirect('/'); // Redirect to the home page after successful event creation
        } catch (error) {
            console.error('Error creating event:', error);
            res.status(500).json({ message: 'Failed to create event' });
        }
    }),
];
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

exports.uploadEventImage = asyncHandler(async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    res.status(200).json({ message: 'Event image uploaded successfully',  filename: req.file.filename });
});

