const eventsController = require('./eventController');

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
