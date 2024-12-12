const express = require('express');
const axios = require('axios');
const asyncHandler = require('express-async-handler');
const eventModel = require('../models/Event');

exports.fetchEventsFromAPI = asyncHandler(async (query) => {
    const API_KEY = process.env.SERP_API_KEY || "5ced3ac846127e3925dadb2d0557d18d077a4e29496627abb9d9d923802bca42";
    const url = "https://serpapi.com/search";
    const params = {
        engine: "google_events",
        q: query,
        api_key: API_KEY,
    };

    try {
        const apiResponse = await axios.get(url, { params });

        // Log the raw API response to inspect the available fields
        console.log("Raw API Response:", JSON.stringify(apiResponse.data, null, 2));

        const apiEvents = apiResponse.data.events_results || [];
        const dbEvents = await eventModel.find();

        const combinedEvents = [
            ...dbEvents.map(event => ({
                title: event.eventTitle,
                categories: event.eventType,
                date: `${event.startDateTime.toLocaleDateString()} - ${event.endDateTime.toLocaleDateString()}`,
                location: `${event.location?.address || ''}, ${event.location?.city || ''}`,
                description: event.description,
                image: event.image || '/images/defaultEvent.png',
                link: event.link || '#',
            })),
            ...apiEvents.map(apiEvent => ({
                title: apiEvent.title,
                categories: apiEvent.event_type?.includes('Virtual-Event')
                    ? 'Virtual'
                    : 'In-Person',
                date: apiEvent.date?.when || 'Date not specified',
                location: apiEvent.address || 'Location not specified',
                description: apiEvent.description || 'No description available',
                image: apiEvent.thumbnail || '/images/defaultEvent.png',
                link: apiEvent.link || '#',
            }))
        ];

        return combinedEvents;
    } catch (error) {
        console.error("Error fetching events:", error);
        throw new Error("Failed to fetch events from API or database.");
    }
});

