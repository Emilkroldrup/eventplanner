const { fetchEventsFromAPI } = require('../models/Event');


async function getEvents(req, res) {
    const query = req.query.q || "Koncerter i København";
    try {
        const events = await fetchEventsFromAPI(query);
        res.render('partials/events', { events });
    } catch (error) {
        console.error("Fejl i controller:", error);
        res.status(500).send("Der opstod en fejl ved hentning af events.");
    }
}

module.exports = { getEvents };
