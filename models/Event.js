const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema( {
    eventTitle: { type: String, required: true },
    eventType: { type: String, required: true },
    age: { type: Number, required: true },
    location: {
        address: { type: String },
        city: { type: String },
        postalCode: { type: String }
    },
    startDateTime: { type: Date, required: true },
    endDateTime: { type: Date, required: true },
    eventManager: {
        name: { type: String },
        email: { type: String },
    },
    description: { type: String, required: true },
    participants: [
        {
            name: { type: String, required: true },
            email: { type: String, required: true },
        }
        ]
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;