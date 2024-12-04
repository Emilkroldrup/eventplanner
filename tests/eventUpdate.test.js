const chai = require('chai');
const chatHttp = require('chai-http');
const server = require('../app');

chai.use(chatHttp);
chai.should();

describe('Event Update', () => {
    it('should update an event with valid user id and event id', (done) => {
        const eventId = "674f19f53686f9dab3a6a4a2";
        const userEmail = "john.doe@example.com";
        chai.request(server)
            .put(`/events`)
            .send({
                eventManager: {
                    name: 'John Doe',
                    email: userEmail,
                },
                id: eventId,
                eventTitle: 'Birthday Party',
                age: 18,
                location: {
                    address: 'Adressen 24',
                    city: 'København',
                    postalCode: '2100',
                },
                eventType: 'Koncert',
                startDateTime: '2024-11-22T18:30:00Z',
                length: '2 hours',
                endDateTime: '2024-11-22T20:30:00Z',
                description: 'Fødselsdagsfest for Mads Madsen',
                banner: 'Photo.jpg'
            })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });

    });

    it('should fail to update event if details are invalid', (done) => {
        const eventId = "674f19f53686f9dab3a6a4a2";
        const userEmail = "madsflaeskeberg@gmail.com";
        chai.request(server)
            .put(`/events`)
            .send({
                eventManager: {
                    name: 'Mads Madsen',
                    email: userEmail,
                },
                id: eventId,
                eventTitle: 'Birthday Party',
                age: '18',
                location: {
                    address: 'fwjni',
                    city: 'Copenhagen',
                    postalCode: '2100',
                },
                eventType: 'Koncert',
                startDateTime: '2024-11-22T18:30:00Z',
                length: '2 hours',
                endDateTime: '2024-11-22T20:30:00Z',
                description: 'Fødselsdagsfest for Mads Madsen',
                banner: 'Photo.jpg'
            })
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});