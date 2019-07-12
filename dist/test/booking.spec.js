"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../../index"));

var _booking = _interopRequireDefault(require("../controllers/booking"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

/* eslint-disable no-unused-vars */

/* eslint-disable no-console */

/* eslint-disable max-len */

/* eslint-disable no-undef */

/* eslint-disable no-unused-expressions */
_chai["default"].use(_chaiHttp["default"]);

(0, _chai.should)();
describe('Testing Bookings Endpoints', function () {
  it('Booking Controller should exist', function () {
    _booking["default"].should.exist;
  });
  it('Create Booking method (POST) should exist', function () {
    _booking["default"].createBooking.should.exist;
  });
  it('Create Booking method (POST) should book a seat on a specific trip', function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/bookings').send({
      userId: 2,
      tripId: 4
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
  it('Create Booking method (POST) should return ERROR if user is not registered', function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/bookings').send({
      userId: 0,
      tripId: 4
    }).end(function (err, res) {
      res.should.have.status(404);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.be.have.property('status');
      res.body.should.be.have.property('error');
      res.body.status.should.equal(404);
      res.body.error.should.be.a('string');
    });

    done();
  });
  it('Create Booking method (POST) should return ERROR if trip is not available', function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/bookings').send({
      userId: 2,
      tripId: 0
    }).end(function (err, res) {
      res.should.have.status(404);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.be.have.property('status');
      res.body.should.be.have.property('error');
      res.body.status.should.equal(404);
      res.body.error.should.be.a('string');
    });

    done();
  });
  it('Create Booking method (POST) should return ERROR if trip is cancelled', function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/bookings').send({
      userId: 2,
      tripId: 1
    }).end(function (err, res) {
      res.should.have.status(404);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.be.have.property('status');
      res.body.should.be.have.property('error');
      res.body.status.should.equal(404);
      res.body.error.should.be.a('string');
    });

    done();
  });
  it('Create Booking method (POST) should return ERROR if trip is fully booked', function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/bookings').send({
      userId: 3,
      tripId: 5
    }).end(function (err, res) {
      res.should.have.status(404);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.be.have.property('status');
      res.body.should.be.have.property('error');
      res.body.status.should.equal(404);
      res.body.error.should.be.a('string');
    });

    done();
  });
  it('Create Booking method (POST) should return ERROR if user is already booked on the trip', function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/bookings').send({
      userId: 3,
      tripId: 2
    }).end(function (err, res) {
      res.should.have.status(404);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.be.have.property('status');
      res.body.should.be.have.property('error');
      res.body.status.should.equal(404);
      res.body.error.should.be.a('string');
    });

    done();
  });
  it('Get Bookings method (GET) should exist', function () {
    _booking["default"].getBookings.should.exist;
  });
  it('Get Bookings method (GET) should return a list of bookings', function (done) {
    _chai["default"].request(_index["default"]).get('/api/v1/bookings').end(function (err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.be.have.property('status');
      res.body.should.be.have.property('data');
      res.body.status.should.equal(200);
      res.body.data.should.be.a('array');
    });

    done();
  }); // No test for errors if no booking exist

  it('Delete Booking method (DELETE) should exist', function () {
    _booking["default"].deleteBooking.should.exist;
  });
  it('Delete Booking method (DELETE) should delete a specific booking', function (done) {
    _chai["default"].request(_index["default"])["delete"]('/api/v1/bookings/4').end(function (err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.be.have.property('status');
      res.body.should.be.have.property('message');
      res.body.status.should.equal(200);
      res.body.error.should.be.a('string');
    });

    done();
  });
  it('Delete Booking method (DELETE) should return an ERROR if booking is not found', function (done) {
    _chai["default"].request(_index["default"])["delete"]('/api/v1/bookings/0').end(function (err, res) {
      res.should.have.status(404);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.be.have.property('status');
      res.body.should.be.have.property('error');
      res.body.status.should.equal(404);
      res.body.error.should.be.a('string');
    });

    done();
  });
  it('Delete Booking method (DELETE) should return an ERROR if booking is found but not deleted', function (done) {
    _chai["default"].request(_index["default"])["delete"]('/api/v1/bookings/1').end(function (err, res) {
      res.should.have.status(404);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.be.have.property('status');
      res.body.should.be.have.property('error');
      res.body.status.should.equal(404);
      res.body.error.should.be.a('string');
    });

    done();
  });
});