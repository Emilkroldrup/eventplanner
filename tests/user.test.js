const chai = require('chai');
const chaiHttp = require('chai-http');
const { app, server} = require('../app');
const should = chai.should();


chai.use(chaiHttp);

describe('User login', () => {
    after((done) => {
        server.close();
        done();
    });

    it('should login succesfully with valid credentials', (done) => {
        chai.request(app)
            .post('/auth/login')
            .send({email: 'testuser', password: 'password123'})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('token');
                done();
            });
    });

    it('should fail to login with invalid credentials', (done) => {
        chai.request(app)
            .post('/auth/login')
            .send({email: 'testuser', password: 'wrongpassword'})
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.have.property('error', 'Invalid credentials');
                done();
            });
    });
});
