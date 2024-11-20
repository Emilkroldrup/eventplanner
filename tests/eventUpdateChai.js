const chai = require('chai');
const chatHttp = require('chai-http');
const server = require('../app');

chai.use(chatHttp);

describe('Event Update', () => {
    it('should update an event with valid user id and event id', (done) => {
        const userId = 1;
        const eventId = 1;
        chai.request(server)
            .put(`/event/${eventId}`)
            .send({
                userId: userId,
                eventId: eventId
            })
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message', 'Event has been updated');
            done();
        });
    });

    it('should fail to update an event with invalid user id and or event id', (done) => {
        const userId = 123;
        const eventId = 321;
        chai.request(server)
            .put(`/event/${eventId}`)
            .send({
                userId: userId,
                eventId: eventId
            })
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('error', 'Invalid details');
            done();
            });
    });
});