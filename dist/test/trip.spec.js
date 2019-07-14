"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../../index"));

var _trip = _interopRequireDefault(require("../controllers/trip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

/* eslint-disable no-unused-vars */

/* eslint-disable no-console */

/* eslint-disable no-shadow */

/* eslint-disable no-undef */

/* eslint-disable no-unused-expressions */
_chai["default"].use(_chaiHttp["default"]);

(0, _chai.should)();
var adminToken;
before(function (done) {
  _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send({
    email: 'oba@gmail.com',
    password: 'pass1'
  }).end(function (err, res) {
    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a('object');
    res.body.should.be.have.property('status');
    res.body.should.be.have.property('data');
    res.body.status.should.equal(200);
    res.body.data.should.be.a('object');
    var token = res.body.data.token; // console.log(res.body.data);

    adminToken = token;
    describe('Testing Trips Endpoints', function () {
      it('Trip Controller should exist', function () {
        _trip["default"].should.exist;
      });
      it('Create Trip method (POST) should exist', function () {
        _trip["default"].createTrip.should.exist;
      });
      it('Create Trip method (POST) should create a new trip', function (done) {
        _chai["default"].request(_index["default"]).post('/api/v1/trips').set('Authorization', "Bearer ".concat(adminToken)).send({
          busId: 3,
          origin: 'LAGOS',
          destination: 'LONDON',
          fare: 4500
        }).end(function (err, res) {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.be.have.property('status');
          res.body.should.be.have.property('data');
          res.body.status.should.equal(201);
          res.body.data.should.be.a('string');
        });

        done();
      });
      it('Create Trip method (POST) should return ERROR if busId does not exist', function (done) {
        _chai["default"].request(_index["default"]).post('/api/v1/trips').set('Authorization', "Bearer ".concat(adminToken)).send({
          busId: 0,
          origin: 'LAGOS',
          destination: 'LONDON',
          fare: 4500
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
      it('Create Trip method (POST) should return ERROR if bus is not active', function (done) {
        _chai["default"].request(_index["default"]).post('/api/v1/trips').set('Authorization', "Bearer ".concat(adminToken)).send({
          busId: 1,
          origin: 'LAGOS',
          destination: 'LONDON',
          fare: 4500
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
      it('Get Trips method (GET) should exist', function () {
        _trip["default"].getTrips.should.exist;
      });
      it('Get Trips method (GET) should retrieve all available trips on record', function (done) {
        _chai["default"].request(_index["default"]).get('/api/v1/trips').set('Authorization', "Bearer ".concat(adminToken)).end(function (err, res) {
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
      it('Cancel Trip method (PATCH) should exist', function () {
        _trip["default"].cancelTrip.should.exist;
      });
      it('Cancel Trip method (PATCH) should cancel a specific trip', function (done) {
        _chai["default"].request(_index["default"]).patch('/api/v1/trips/1').set('Authorization', "Bearer ".concat(adminToken)).send({
          status: 'cancelled'
        }).end(function (err, res) {
          res.should.have.status(205);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.be.have.property('status');
          res.body.should.be.have.property('message');
          res.body.status.should.equal(205);
          res.body.data.should.be.a('string');
        });

        done();
      });
      it('Cancel Trip method (PATCH) should return an ERROR if trip is not found', function (done) {
        _chai["default"].request(_index["default"]).patch('/api/v1/trips/0').set('Authorization', "Bearer ".concat(adminToken)).send({
          status: 'cancelled'
        }).end(function (err, res) {
          res.should.have.status(404);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.be.have.property('status');
          res.body.should.be.have.property('error');
          res.body.status.should.equal(404);
          res.body.data.should.be.a('string');
        });

        done();
      });
    }); // End of top level 'describe' function
  });

  done();
}); // End of before hook function