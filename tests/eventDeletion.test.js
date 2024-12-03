const chai = require('chai');
const chaiHttp = require('chai-http')
const server = require('../app');

chai.use(chaiHttp);
chai.should();
describe('Event Deletion', () => {
    it('should delete an event with valid user id and event id', (done) => {
        const userEmail = "john.doe@example.com";
        const eventId = "674f182b2b64e36cddb6db3c";
        chai.request(server)
            .delete(`/events`)
            .send({
                id: eventId,
                email: userEmail

            })
            .end((err,res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('should fail to delete an event with the given eventId', (done) => {
        const userEmail = "john.doe@example.com";
        const eventId = "674f182b2b64e36cddb6db3c";
        chai.request(server)
            .delete(`/event/${eventId}`)
            .send({id: eventId, email: '' })
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});