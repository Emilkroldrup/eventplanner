const asyncHandler = require('express-async-handler');
const userModel = require('../models/User');
const eventModel = require('../models/Event');

exports.getUser = asyncHandler(async (req, res) => {
    const email = req.query.email;
    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json( { user } );
});

exports.createUser = asyncHandler(async (req, res) => {
    const newUser = new userModel(req.body);
    await newUser.save();
    return res.status(201).json({ message: 'User has been created', newUser });
});

exports.updateUser = asyncHandler(async (req, res) => {
    const { oldEmail, newEmail, ...updateFields } = req.body;

    const user = await userModel.findOne({ email: oldEmail });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    await userModel.updateOne({ email: oldEmail }, { email: newEmail, ...updateFields });
    await eventModel.updateMany(
        { 'eventManager.email': oldEmail },
        { $set: { 'eventManager.email': newEmail } }
    );

    return res.status(200).json({ message: 'User and related events have been updated' });
});

exports.deleteUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const user = await userModel.findOne({ email })
    if(!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    await eventModel.deleteMany({ 'eventManager.email': email });
    await userModel.deleteOne({ email });
    return res.status(200).json({ message: 'User and their events have been deleted' })
});

exports.uploadProfilePicture = asyncHandler(async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    res.status(200).json({ message: 'Profile picture uploaded successfully',  filename: req.file.filename });
});

exports.participation = asyncHandler(async (req, res) => {
    const { name, email, eventId } = req.body;
    const user = await userModel.findOne({ email });

    if(!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const event = await eventModel.findById(eventId);

    if(event.eventManager.email === email){
        return res.status(200).send({ message: 'Event manager cannot join their own event' })
    }

    if (!event) {
        return res.status(404).json({ message: 'Event not found' });
    }

    const isAlreadyParticipant = event.participants.findIndex(participant => participant.email === email);
    if(isAlreadyParticipant !== -1) {
        event.participants.splice(isAlreadyParticipant, 1);
        await event.save();
        return res.status(200).json({ message: 'User has been removed as a participant', event });
    }

    event.participants.push({ name, email });
    await event.save();

    res.status(200).json({ message: 'User has been added as a participant', event });
});

exports.getUsersEvents = asyncHandler(async (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const events = await eventModel.find({ "participants.email": email });

    if (events.length === 0) {
        return res.status(404).json({ message: 'No events found' });
    }

    res.status(200).json({ message: 'Events found', events });
});
