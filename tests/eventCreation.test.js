const chai = require('chai');
const chaiHttp = require('chai-http')
const server = require('../app');

chai.use(chaiHttp);

describe('Event Creation', () => {
    it('should create and event with valid details', (done) =>{
        chai.request(server)
            .post('/event')
            .send({
                eventName: 'Birthday Party',
                description: 'Birthday party for John',
                date: '2024-21-11',
                location: 'Grevinge'
            })
            .end((err, res) =>{
                res.should.have.status(201);
                res.body.should.have.property('message', 'Event has been created');
                done();
            });
    });

    it('should fail to create an event if details are missing', (done) => {
        chai.request(server)
            .post('/event')
            .send({ eventName: '', description: '', date: '', location: '' })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('error', 'Invalid details')
                done();
            });
    });
});