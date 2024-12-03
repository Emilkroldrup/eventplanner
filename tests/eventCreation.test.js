const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

chai.use(chaiHttp);
chai.should();

describe('Event Creation', () => {
    it('should create and event with valid details', (done) =>{
        chai.request(server)
            .post('/events/create')
            .send({
                eventTitle: 'Birthday Party',
                eventType: 'Concert',
                age: 18,
                location: {
                    address: 'Adressen 23',
                    city: 'København',
                    postalCode: '2100',
                },
                startDateTime: '2024-11-22T18:30:00Z',
                endDateTime: '2024-11-22T20:30:00Z',
                eventManager: {
                    name: 'John Doe',
                    email: 'john.doe@example.com',
                },
                description: 'Fødselsdagsfest for Mads Madsen',
            })
            .end((err, res) =>{
                res.should.have.status(201);
                done();
            });
    });

    it('should fail to create an event if details are missing', (done) => {
        chai.request(server)
            .post('/event')
            .send({
                eventTitle: 'Birthday Party',
                eventType: 'Concert',
                age: 18,
                location: {
                    address: 'Adressen 23',
                    city: 'København',
                    postalCode: '2100',
                },
                startDateTime: '2024-11-22T18:30:00Z',
                endDateTime: '2024-11-22T20:30:00Z',
                eventManager: {
                    name: 'John Doe',
                    email: 'john.doe@example.com',
                },
                description: 'Fødselsdagsfest for Mads Madsen',
            })
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});