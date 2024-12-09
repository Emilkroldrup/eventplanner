const eventsController = require('./eventController');
const userModel = require('../models/User');

exports.getHome = async (req, res) => {
    try {
        const events = await eventsController.fetchEvents();

        res.render('home', {
            pageTitle: 'Home',
            events,
        });
    } catch (error) {
        console.error('Failed to load homepage:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getProfilePage = async (req, res) => {
    try {
        if (!res.locals.user) {
            return res.status(401).send('User not authenticated');
        }

        const user = await userModel.findById(res.locals.user.id);

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.render('profilePage', {
            pageTitle: 'Profile',
            user
        });
    } catch (error) {
        console.error('Failed to load profilePage:', error);
        res.status(500).send('Internal Server Error');
    }
};