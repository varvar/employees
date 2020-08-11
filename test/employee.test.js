process.env.NODE_ENV = 'test';

const User = require('../models/User');

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();
chai.use(chaiHttp);

describe('Test Employee CRUD API', () => {
  let userId, employeeId, token;

  after((done) => {
    User.findByIdAndRemove(userId).then(() => {
      done();
    });
  });

  it('should create a new user', (done) => {
    const user = {
      username: 'Segafredo',
      email: 'segafredo@mail.com',
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

  it('should login user', (done) => {
    let user = {
      email: 'segafredo@mail.com',
      password: '123123123',
    };
    chai
      .request(server)
      .post('/api/v1/users/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.be.a('object');
        res.body.should.have.property('token');
        token = res.body.token;
        done();
      });
  });

  it('Should not create new employee without first name', (done) => {
    const employee = {
      lastName: 'Watson',
      position: 'manager',
      address: 'Jerusalem',
    };
    chai
      .request(server)
      .post('/api/v1/employees/add')
      .set('Authorization', 'Bearer ' + token)
      .send(employee)
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.have.property('message');
        done();
      });
  });

  it('Should create new employee for logged in user', (done) => {
    const employee = {
      firstName: 'John',
      lastName: 'Watson',
      position: 'manager',
      address: 'Jerusalem',
    };
    chai
      .request(server)
      .post('/api/v1/employees/add')
      .set('Authorization', 'Bearer ' + token)
      .send(employee)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.not.have.property('errors');
        res.body.should.have.property('firstName');
        res.body.should.have.property('lastName');
        res.body.should.have.property('position');
        res.body.should.have.property('address');
        res.body.should.have.property('hired');
        res.body.should.have.property('employeeId');
        employeeId = JSON.parse(res.text)._id;
        done();
      });
  });

  it('Should return employees list', (done) => {
    chai
      .request(server)
      .get('/api/v1/employees/')
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.to.equal(1);
        done();
      });
  });

  it('Should update employee', (done) => {
    const employee = {
      firstName: 'John2',
      lastName: 'Watson2',
      position: 'manager',
      address: 'Haifa',
    };
    chai
      .request(server)
      .put(`/api/v1/employees/update/${employeeId}`)
      .set('Authorization', 'Bearer ' + token)
      .send(employee)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('firstName');
        res.body.should.have.property('lastName');
        res.body.should.have.property('position');
        res.body.should.have.property('address');
        res.body.should.have.property('hired');
        res.body.should.have.property('employeeId');
        res.body.firstName.should.to.equal('John2');
        res.body.lastName.should.to.equal('Watson2');
        res.body.position.should.to.equal('manager');
        res.body.address.should.to.equal('Haifa');
        done();
      });
  });

  it('Should find specific employee by search criterea ', (done) => {
    chai
      .request(server)
      .get('/api/v1/employees/find/address/Haifa')
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.to.above(0);
        done();
      });
  });

  it('Should delete specific employee', (done) => {
    chai
      .request(server)
      .delete(`/api/v1/employees/remove/${employeeId}`)
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        res.should.have.status(204);
        done();
      });
  });
});
