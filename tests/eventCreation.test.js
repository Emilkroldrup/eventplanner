const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

chai.use(chaiHttp);

describe('Event Creation', () => {
    it('should create and event with valid details', (done) =>{
        chai.request(server)
            .post('/event')
            .send({
                email: 'madsmadsen@gmail.com',
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
            .end((err, res) =>{
                res.should.have.status(201);
                res.body.should.have.property('message', 'Event has been created');
                done();
            });
    });

    it('should fail to create an event if details are missing', (done) => {
        chai.request(server)
            .post('/event')
            .send({
                email: 'madsmadsen@gmail.com',
                eventId: eventId,
                eventTitle: 'Birthday Party',
                age: '18+',
                city: '',
                address: '',
                postalcode: '',
                eventType: 'Koncert',
                startDateTime: '22-11-2024 18:30',
                length: '2 hours',
                endDateTime: '22-11-2024 20:30',
                description: 'Fødselsdagsfest for Mads Madsen',
                banner: 'Photo.jpg'
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('error', 'Invalid details')
                done();
            });
    });
});