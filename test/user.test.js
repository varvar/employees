process.env.NODE_ENV = 'test';

const User = require('../models/User');

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();

chai.use(chaiHttp);

describe('Test User CRUD API', () => {
  let userId, token;

  after((done) => {
    User.findByIdAndRemove(userId).then(() => {
      done();
    });
  });

  it('should not create a user without required fields', (done) => {
    let user = {
      password: '123123123',
    };
    chai
      .request(server)
      .post('/api/v1/users')
      .send(user)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.have.property('email');
        done();
      });
  });

  it('should create a new user', (done) => {
    const user = {
      username: 'CafeCafe',
      email: 'cagfe@mail.com',
      password: '123123123',
    };
    chai
      .request(server)
      .post('/api/v1/users')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.not.have.property('errors');
        res.body.should.have.property('email');
        res.body.should.have.property('_id');
        res.body.should.have.property('username');
        userId = res.body._id;
        done();
      });
  });

  it('should not create a user with same email', (done) => {
    let user = {
      username: 'CafeCafe',
      email: 'cagfe@mail.com',
      password: '123123123',
    };
    chai
      .request(server)
      .post('/api/v1/users')
      .send(user)
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.have.property('message');
        done();
      });
  });

  it('should login user', (done) => {
    let user = {
      email: 'cagfe@mail.com',
      password: '123123123',
    };
    chai
      .request(server)
      .post('/api/v1/users/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('token');
        token = res.body.token;
        done();
      });
  });

  it('should get current user', (done) => {
    chai
      .request(server)
      .get('/api/v1/users/current')
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('email');
        res.body.should.have.property('_id');
        res.body.should.have.property('username');
        done();
      });
  });
});
