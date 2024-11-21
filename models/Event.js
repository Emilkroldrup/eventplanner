const axios = require('axios');


async function fetchEventsFromAPI(query) {
    const API_KEY = process.env.SERP_API_KEY || "5ced3ac846127e3925dadb2d0557d18d077a4e29496627abb9d9d923802bca42";
    const url = "https://serpapi.com/search";
    const params = {
        engine: "google_events",
        q: query,
        api_key: API_KEY,
    };

    try {
        const response = await axios.get(url, { params });
        return response.data.events_results || [];
    } catch (error) {
        console.error("Fejl ved API-forespørgsel:", error);
        throw new Error("Kunne ikke hente events fra API.");
    }
}

module.exports = { fetchEventsFromAPI };