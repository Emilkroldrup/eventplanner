const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();


chai.use(chaiHttp);

describe('Event retrieval', () => {
    it('should retrieve all events', (done) => {
        chai.request(server)
            .get('/events')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('array');
                done();
            });
    });

    it('should filter events by eventtype', (done) => {
        chai.request(server)
            .get('/events?type=concert')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.every(event => event.type==='concert').should.be.true;
                done();
            });
    });

    it('should filter events by location', (done) => {
        chai.request(server)
            .get('/events?location=copenhagen')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.every(event => event.location==='copenhagen').should.be.true;
                done();
            });
    });
});