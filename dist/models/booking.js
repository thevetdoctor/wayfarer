"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regeneratorRuntime = _interopRequireDefault(require("regenerator-runtime"));

var _connect = _interopRequireDefault(require("../db/connect"));

var _bookingQueries = _interopRequireDefault(require("../helpers/queries/bookingQueries"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var checkUserQuery = _bookingQueries["default"].checkUserQuery,
    getTripsQuery = _bookingQueries["default"].getTripsQuery,
    checkBookingQuery = _bookingQueries["default"].checkBookingQuery,
    updateTripQuery = _bookingQueries["default"].updateTripQuery,
    bookingQuery = _bookingQueries["default"].bookingQuery,
    getBookingQuery = _bookingQueries["default"].getBookingQuery,
    deleteBookingQuery = _bookingQueries["default"].deleteBookingQuery,
    updateTripWithDeletedBookingQuery = _bookingQueries["default"].updateTripWithDeletedBookingQuery,
    deletedBookingQuery = _bookingQueries["default"].deletedBookingQuery,
    checkTrip = _bookingQueries["default"].checkTrip,
    checkSeats = _bookingQueries["default"].checkSeats,
    checkSeatsOnTrip = _bookingQueries["default"].checkSeatsOnTrip,
    updateSeatsOnTrip = _bookingQueries["default"].updateSeatsOnTrip,
    updateSeatsOnBooking = _bookingQueries["default"].updateSeatsOnBooking;

var Booking =
/*#__PURE__*/
function () {
  function Booking(userId, tripId) {
    _classCallCheck(this, Booking);

    this.id = null;
    this.tripId = tripId;
    this.userId = userId;
    this.busId = null;
    this.origin = null;
    this.destination = null;
    this.tripDate = null;
    this.seatNumber = null;
    this.createdOn = null;
  }

  _createClass(Booking, [{
    key: "userCheck",
    value: function () {
      var _userCheck = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime["default"].mark(function _callee(userId) {
        var _this = this;

        var _ref, rows, foundUser;

        return _regeneratorRuntime["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _connect["default"].query(checkUserQuery);

              case 2:
                _ref = _context.sent;
                rows = _ref.rows;
                foundUser = rows.filter(function (user) {
                  return user.id === parseInt(_this.userId, 10);
                });
                return _context.abrupt("return", foundUser);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function userCheck(_x) {
        return _userCheck.apply(this, arguments);
      }

      return userCheck;
    }()
  }, {
    key: "checkTrip",
    value: function () {
      var _checkTrip = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime["default"].mark(function _callee2(tripId, res) {
        var _ref2, rows, foundTrip;

        return _regeneratorRuntime["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _connect["default"].query(getTripsQuery, [this.tripId]);

              case 2:
                _ref2 = _context2.sent;
                rows = _ref2.rows;
                foundTrip = rows[0];
                return _context2.abrupt("return", foundTrip);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function checkTrip(_x2, _x3) {
        return _checkTrip.apply(this, arguments);
      }

      return checkTrip;
    }()
  }, {
    key: "checkBooking",
    value: function () {
      var _checkBooking = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime["default"].mark(function _callee3(res) {
        var _ref3, rows;

        return _regeneratorRuntime["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _connect["default"].query(checkBookingQuery, [this.userId, this.tripId]);

              case 2:
                _ref3 = _context3.sent;
                rows = _ref3.rows;
                return _context3.abrupt("return", rows);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function checkBooking(_x4) {
        return _checkBooking.apply(this, arguments);
      }

      return checkBooking;
    }()
  }, {
    key: "updateTrip",
    value: function () {
      var _updateTrip = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime["default"].mark(function _callee4() {
        var _db$query, rows;

        return _regeneratorRuntime["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _db$query = _connect["default"].query(updateTripQuery, [this.tripId]), rows = _db$query.rows;
                return _context4.abrupt("return", rows);

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function updateTrip() {
        return _updateTrip.apply(this, arguments);
      }

      return updateTrip;
    }()
  }], [{
    key: "notRegistered",
    value: function notRegistered(res) {
      return res.status(404).json({
        status: 404,
        error: 'User not registered'
      });
    }
  }, {
    key: "notAvailable",
    value: function notAvailable(res) {
      // console.log(this.userId);
      return res.status(404).json({
        status: 404,
        error: 'Trip is not available'
      });
    }
  }, {
    key: "tripCancelled",
    value: function tripCancelled(res) {
      return res.status(404).json({
        status: 404,
        error: 'Trip has been cancelled'
      });
    }
  }, {
    key: "fullyBooked",
    value: function fullyBooked(res) {
      return res.status(404).json({
        status: 404,
        error: 'Sorry please, No more empty seats- Trip is fully booked'
      });
    }
  }, {
    key: "tripResponse",
    value: function tripResponse(foundTrip, res) {
      if (!foundTrip) {
        Booking.notAvailable(res);
      }

      if (foundTrip.status === 'cancelled') {
        Booking.tripCancelled(res);
      }

      if (foundTrip.booking_status === foundTrip.capacity) {
        Booking.fullyBooked(res);
      }

      return true;
    }
  }, {
    key: "alreadyBooked",
    value: function alreadyBooked(res) {
      return res.status(404).json({
        status: 404,
        error: 'You are booked on this trip already'
      });
    }
  }, {
    key: "makeBooking",
    value: function () {
      var _makeBooking = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime["default"].mark(function _callee5(tripUpdate, completeBookingData, res) {
        var _ref4, rows, booking, data;

        return _regeneratorRuntime["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _connect["default"].query(bookingQuery, completeBookingData);

              case 2:
                _ref4 = _context5.sent;
                rows = _ref4.rows;
                booking = rows[0];
                data = {
                  booking_id: booking.id,
                  trip_id: booking.trip_id,
                  user_id: booking.user_id,
                  bus_id: booking.bus_id,
                  origin: booking.origin,
                  destination: booking.destination,
                  trip_date: tripUpdate.trip_date,
                  seat_number: tripUpdate.booking_status,
                  message: 'Your trip has been booked'
                };
                res.status(201).json({
                  status: 201,
                  data: data
                });

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function makeBooking(_x5, _x6, _x7) {
        return _makeBooking.apply(this, arguments);
      }

      return makeBooking;
    }()
  }]);

  return Booking;
}();

var _default = Booking;
exports["default"] = _default;