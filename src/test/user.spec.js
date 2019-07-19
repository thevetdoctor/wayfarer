/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
import chai, { should } from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
import UserController from '../controllers/user';

chai.use(chaiHttp);
should();

describe('Testing Users Endpoints', () => {
  it('User Controller should exist', () => {
    UserController.should.exist;
  });

  it('Create method (POST) should exist', () => {
    UserController.createUser.should.exist;
  });

  it('Create method (POST) should create a new user', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        email: 'email@email.com',
        firstName: 'test',
        lastName: 'test',
        password: 'pass_test',
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.be.have.property('status');
        res.body.should.be.have.property('data');
        res.body.status.should.equal(201);
        res.body.data.should.be.a('object');
      });
    done();
  });

  it('Create method (POST) should return ERROR if user already exist', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        email: 'dami@gmail.com',
        firstName: 'test',
        lastName: 'test',
        password: 'pass_test',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.be.have.property('status');
        res.body.should.be.have.property('error');
        res.body.status.should.equal(400);
        res.body.error.should.be.a('string');
      });
    done();
  });

  it('Sign-in method (POST) should exist', () => {
    UserController.signIn.should.exist;
  });

  it('Sign-in method (POST) should sign in a registered user', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send({
        email: 'dami@gmail.com',
        password: 'damipass',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.be.have.property('status');
        res.body.should.be.have.property('data');
        res.body.status.should.equal(200);
        res.body.data.should.be.a('object');
      });
    done();
  });

  it('Sign-in method (POST) should return ERROR if email is invalid', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send({
        email: 'dam@gmail.com',
        password: 'damipass',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.be.have.property('status');
        res.body.should.be.have.property('error');
        res.body.status.should.equal(400);
        res.body.error.should.be.a('string');
      });
    done();
  });

  it('Sign-in method (POST) should return ERROR if password is invalid', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send({
        email: 'dami@gmail.com',
        password: 'pass',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.be.have.property('status');
        res.body.should.be.have.property('error');
        res.body.status.should.equal(400);
        res.body.error.should.be.a('string');
      });
    done();
  });
});
