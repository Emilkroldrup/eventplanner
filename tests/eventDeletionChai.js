const chai = require('chai');
const chaiHttp = require('chai-http')
const server = require('../app');

chai.use(chaiHttp);

describe('Event Deletion', () => {
    it('should delete an event with valid user id and event id', (done) => {
        const userId = 1;
        const eventId = 1;
        chai.request(server)
            .delete(`/event/${eventId}`)
            .send({
                userId: userId,
                eventId: eventId
            })
            .end((err,res) => {
                res.should.have.status(204);
                res.body.should.have.property('message', 'Event has been deleted');
                done();
            });
    });
    it('should fail to delete an event with the given eventId', (done) => {
        const userId = 123;
        const eventId = 321;
        chai.request(server)
            .delete(`/event/${eventId}`)
            .send({ userId: '', eventId: eventId })
            .end((err, res) => {
                res.should.have.status(204);
                res.body.should.have.property('error', 'Invalid details');
                done();
            });
    });
});