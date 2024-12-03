const chai = require('chai');
const chaiHttp = require('chai-http')
const server = require('../app');

chai.use(chaiHttp);
chai.should();
describe('Event Deletion', () => {
    it('should delete an event with valid user id and event id', (done) => {
        const userEmail = "mads@example.com";
        const eventId = "674d9f083c3f7c42742ea2fc";
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
        const userEmail = "noemail@example.com";
        const eventId = "674d9f083c3f7c42742ea2fc";
        chai.request(server)
            .delete(`/events`)
            .send({id: eventId, email: '' })
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});