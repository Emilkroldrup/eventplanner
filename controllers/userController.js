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