"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../../index"));

var _user = _interopRequireDefault(require("../controllers/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

/* eslint-disable no-unused-vars */

/* eslint-disable no-console */

/* eslint-disable no-undef */

/* eslint-disable no-unused-expressions */
_chai["default"].use(_chaiHttp["default"]);

(0, _chai.should)();
describe('Testing Users', function () {
  it('User Controller should exist', function () {
    _user["default"].should.exist;
  });
  it('Create method (POST) should exist', function () {
    _user["default"].createUser.should.exist;
  });
  it('Create method (POST) should create a new user', function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
      email: 'email@email.com',
      firstName: 'test',
      lastName: 'test',
      password: 'pass_test'
    }).end(function (err, res) {
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
  it('Create method (POST) should return ERROR if user already exist', function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
      email: 'dami@gmail.com',
      firstName: 'test',
      lastName: 'test',
      password: 'pass_test'
    }).end(function (err, res) {
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
  it('Sign-in method (POST) should exist', function () {
    _user["default"].signIn.should.exist;
  });
  it('Sign-in method (POST) should sign in a registered user', function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send({
      email: 'dami@gmail.com',
      password: 'pass2'
    }).end(function (err, res) {
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
  it('Sign-in method (POST) should return ERROR if email is invalid', function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send({
      email: 'dam@gmail.com',
      password: 'pass2'
    }).end(function (err, res) {
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
  it('Sign-in method (POST) should return ERROR if password is invalid', function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send({
      email: 'dami@gmail.com',
      password: 'pass'
    }).end(function (err, res) {
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