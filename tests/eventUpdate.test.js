const chai = require('chai');
const chatHttp = require('chai-http');
const server = require('../app');

chai.use(chatHttp);

describe('Event Update', () => {
    it('should update an event with valid user id and event id', (done) => {
        const eventId = 1;
        chai.request(server)
            .put(`/event/${eventId}`)
            .send({
                email: 'madsmadsen@gmail.com',
                eventId: eventId,
                eventTitle: 'Birthday Party',
                age: '18+',
                city: 'København',
                address: 'Adressen 23',
                postalcode: '2100',
                eventType: 'Koncert',
                startDateTime: '22-11-2024 18:30',
                length: '2 hours',
                endDateTime: '22-11-2024 20:30',
                description: 'Fødselsdagsfest for Mads Madsen',
                banner: 'Photo.jpg'
            })
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message', 'Event has been updated');
            done();
        });
    });

    it('should fail to update event if details are invalid', (done) => {
        const eventId = 321;
        chai.request(server)
            .put(`/event/${eventId}`)
            .send({
                email: 'madsmadsen@gmail.com',
                eventId: eventId,
                eventTitle: 'Birthday Party',
                age: '',
                city: '',
                address: '',
                postalcode: '2100',
                eventType: 'Koncert',
                startDateTime: '22-11-2024 18:30',
                length: '2 hours',
                endDateTime: '22-11-2024 20:30',
                description: 'Fødselsdagsfest for Mads Madsen',
                banner: 'Photo.jpg'
            })
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('error', 'Invalid details');
            done();
            });
    });
});