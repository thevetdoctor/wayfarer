"use strict";

var _bookingQueries = _interopRequireDefault(require("../helpers/queries/bookingQueries"));

var _booking = _interopRequireDefault(require("../models/booking"));

var _connect = _interopRequireDefault(require("../db/connect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var checkUserQuery = _bookingQueries["default"].checkUserQuery,
    getTripsQuery = _bookingQueries["default"].getTripsQuery,
    updateTripQuery = _bookingQueries["default"].updateTripQuery,
    bookingQuery = _bookingQueries["default"].bookingQuery,
    checkBookingQuery = _bookingQueries["default"].checkBookingQuery,
    getBookingQuery = _bookingQueries["default"].getBookingQuery,
    checkBookingsForUserQuery = _bookingQueries["default"].checkBookingsForUserQuery,
    checkBookingForAdminQuery = _bookingQueries["default"].checkBookingForAdminQuery,
    checkBookingForUserQuery = _bookingQueries["default"].checkBookingForUserQuery,
    deleteBookingQuery = _bookingQueries["default"].deleteBookingQuery,
    updateTripWithDeletedBookingQuery = _bookingQueries["default"].updateTripWithDeletedBookingQuery,
    deletedBookingQuery = _bookingQueries["default"].deletedBookingQuery,
    checkTripByAdmin = _bookingQueries["default"].checkTripByAdmin,
    checkTrip = _bookingQueries["default"].checkTrip,
    checkSeats = _bookingQueries["default"].checkSeats,
    checkSeatsOnTrip = _bookingQueries["default"].checkSeatsOnTrip,
    updateSeatsOnTrip = _bookingQueries["default"].updateSeatsOnTrip,
    updateSeatsOnBooking = _bookingQueries["default"].updateSeatsOnBooking;

var BookingController =
/*#__PURE__*/
function () {
  function BookingController() {
    _classCallCheck(this, BookingController);
  }

  _createClass(BookingController, null, [{
    key: "createBooking",
    value: function createBooking(req, res) {
      var trip_id = req.body.trip_id;
      var user_id = req.token.id; // const newBooking = new Booking(userId, tripId);

      var updateData = [trip_id];
      var bookingData = [user_id, trip_id];

      _connect["default"].query(checkUserQuery).then(function (result) {
        var foundUser = result.rows.filter(function (user) {
          return user.id === parseInt(user_id, 10);
        });

        if (foundUser.length < 1) {
          res.status(404).json({
            status: 404,
            error: 'User not registered'
          });
          return;
        }

        console.log('found user', foundUser);

        _connect["default"].query(getTripsQuery, [trip_id]).then(function (result1) {
          var foundTrip = result1.rows[0];

          if (!foundTrip) {
            res.status(404).json({
              status: 404,
              error: 'Trip is not available'
            });
            return;
          }

          if (foundTrip.status === 'cancelled') {
            res.status(404).json({
              status: 404,
              error: 'Trip has been cancelled'
            });
            return;
          }

          if (foundTrip.booking_status === foundTrip.capacity) {
            res.status(404).json({
              status: 404,
              error: 'Sorry please, No more empty seats- Trip is fully booked'
            });
            return;
          }

          _connect["default"].query(checkBookingQuery, bookingData).then(function (result2) {
            var tripBooked = result2.rows[0];
            console.log(result2.rows[0]);

            if (tripBooked) {
              res.status(404).json({
                status: 404,
                error: 'You are booked on this trip already'
              });
              return;
            }

            _connect["default"].query(updateTripQuery, updateData).then(function (result3) {
              var tripUpdate = result3.rows[0];
              var seatNo = tripUpdate.booked_seats[tripUpdate.booked_seats.length - 1];
              console.log('seat no', seatNo);
              var moreBookingData = [foundTrip.bus_id, foundTrip.origin, foundTrip.destination, tripUpdate.trip_date, seatNo];
              var completeBookingData = [].concat(bookingData, moreBookingData);

              _connect["default"].query(bookingQuery, completeBookingData).then(function (result4) {
                var booking = result4.rows[0];
                var data = {
                  booking_id: booking.id,
                  user_id: booking.user_id,
                  trip_id: booking.trip_id,
                  bus_id: booking.bus_id,
                  origin: booking.origin,
                  destination: booking.destination,
                  trip_date: tripUpdate.trip_date,
                  seat_number: tripUpdate.booking_status,
                  first_name: foundUser[0].first_name,
                  last_name: foundUser[0].last_name,
                  email: foundUser[0].email,
                  message: 'Your trip has been booked'
                };
                res.status(201).json({
                  status: 201,
                  data: data
                });
              })["catch"](function (err) {
                return console.log(err);
              });
            })["catch"](function (err) {
              return console.log(err);
            });
          })["catch"](function (err) {
            return console.log(err);
          });
        })["catch"](function (err) {
          return console.log(err);
        });
      })["catch"](function (err) {
        return console.log(err);
      });
    }
  }, {
    key: "getBookings",
    value: function getBookings(req, res) {
      var _req$token = req.token,
          id = _req$token.id,
          is_admin = _req$token.is_admin;
      var user_id = id;
      console.log(user_id, is_admin);
      var query;

      if (is_admin) {
        query = [getBookingQuery];
      } else {
        query = [checkBookingsForUserQuery, [user_id]];
      }

      _connect["default"].query.apply(_connect["default"], _toConsumableArray(query)).then(function (result) {
        if (result.rows.length < 1) {
          res.status(404).json({
            status: 404,
            error: 'No bookings on record'
          });
          return;
        }

        var data = result.rows.map(function (item) {
          return {
            booking_id: item.id,
            user_id: item.user_id,
            trip_id: item.trip_id,
            bus_id: item.bus_id,
            origin: item.origin,
            destination: item.destination,
            trip_date: item.created_on,
            seat_number: item.seat_number,
            first_name: item.first_name,
            last_name: item.last_name,
            email: item.email
          };
        });
        res.status(200).json({
          status: 200,
          data: data
        });
      })["catch"](function (err) {
        return console.log(err);
      });
    }
  }, {
    key: "deleteBooking",
    value: function deleteBooking(req, res) {
      var booking_id = req.params.booking_id;
      var _req$token2 = req.token,
          id = _req$token2.id,
          is_admin = _req$token2.is_admin;
      var user_id = id; // console.log('user_id:', id, ', is_admin:', is_admin);

      var checkData = [user_id, booking_id];
      var query;

      if (is_admin) {
        query = [checkBookingForAdminQuery, [booking_id]];
      } else {
        query = [checkBookingForUserQuery, checkData];
      }

      _connect["default"].query.apply(_connect["default"], _toConsumableArray(query)).then(function (result1) {
        if (result1.rows.length < 1) {
          res.status(404).json({
            status: 404,
            error: 'No such booking found'
          });
          return;
        }

        _connect["default"].query(deleteBookingQuery, [booking_id]).then(function (result2) {
          var data = result2.rows[0];
          var updateTripWithDeletedBookingData = [1, result1.rows[0].trip_id];

          _connect["default"].query(updateTripWithDeletedBookingQuery, updateTripWithDeletedBookingData).then(function (result3) {
            var deleted = result3.rows; // console.log(deleted);

            var deletedBookingData = Object.values(data); // console.log(deletedBookingData);

            _connect["default"].query(deletedBookingQuery, deletedBookingData).then(function (result4) {
              // console.log(result4.rows);
              res.status(200).json({
                status: 200,
                data: {
                  message: 'Booking deleted successfully'
                }
              });
            })["catch"](function (err) {
              return console.log(err);
            });
          })["catch"](function (err) {
            return console.log(err);
          });
        })["catch"](function (err) {
          return console.log(err);
        });
      })["catch"](function (err) {
        return console.log(err);
      });
    }
  }, {
    key: "checkAvailableSeats",
    value: function () {
      var _checkAvailableSeats = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var _req$token3, id, is_admin, booking_id, user_id, query, _ref, rows, seats, oldSeatNumber, freeSeats, bookedSeats, availableSeats;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$token3 = req.token, id = _req$token3.id, is_admin = _req$token3.is_admin;
                booking_id = req.params.booking_id;
                user_id = parseInt(id, 10);

                if (is_admin) {
                  query = [checkTripByAdmin, [booking_id]];
                } else {
                  query = [checkTrip, [booking_id, user_id]];
                }

                _context.next = 6;
                return _connect["default"].query.apply(_connect["default"], _toConsumableArray(query));

              case 6:
                _ref = _context.sent;
                rows = _ref.rows;
                console.log(user_id, rows);

                if (!rows.length) {
                  _context.next = 20;
                  break;
                }

                console.log('booking_id ->', booking_id);
                console.log('trip_id ->', rows[0].trip_id);
                _context.next = 14;
                return _connect["default"].query(checkSeats, [rows[0].trip_id]);

              case 14:
                seats = _context.sent;
                oldSeatNumber = rows[0].seat_number;
                console.log('old seat number', oldSeatNumber);

                if (seats.rows.length) {
                  freeSeats = seats.rows[0].free_seats;
                  bookedSeats = seats.rows[0].booked_seats;
                  console.log('free seats', freeSeats);
                  console.log('booked seats', bookedSeats);
                  availableSeats = seats.rows[0].capacity - seats.rows[0].booked_seats.length;
                  availableSeats = availableSeats > 0 ? "".concat(seats.rows[0].free_seats.length, " seats available! ") : 'Seats gone';
                  res.status(200).json({
                    status: 200,
                    tripId: seats.rows[0].id,
                    yourSeatNumber: oldSeatNumber,
                    freeSeats: freeSeats,
                    bookedSeats: bookedSeats,
                    availableSeats: availableSeats
                  });
                }

                _context.next = 22;
                break;

              case 20:
                console.log('Booking not found!');
                res.status(404).json({
                  status: 404,
                  error: 'Booking not found!'
                });

              case 22:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function checkAvailableSeats(_x, _x2) {
        return _checkAvailableSeats.apply(this, arguments);
      }

      return checkAvailableSeats;
    }()
  }, {
    key: "changeSeat",
    value: function () {
      var _changeSeat = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var trip_id, _req$body, old_seat_number, new_seat_number, booking_id, _ref2, rows, freeSeats, bookedSeats, updateTrip, seatChanged;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                trip_id = req.body.trip_id;
                _req$body = req.body, old_seat_number = _req$body.old_seat_number, new_seat_number = _req$body.new_seat_number;
                booking_id = req.params.booking_id;
                old_seat_number = parseInt(old_seat_number, 10);
                new_seat_number = parseInt(new_seat_number, 10);
                _context2.next = 7;
                return _connect["default"].query(checkSeatsOnTrip, [trip_id]);

              case 7:
                _ref2 = _context2.sent;
                rows = _ref2.rows;

                if (!rows.length) {
                  _context2.next = 29;
                  break;
                }

                freeSeats = rows[0].free_seats;
                bookedSeats = rows[0].booked_seats; // console.log('free seats', freeSeats);
                // console.log('booked seats', bookedSeats);

                if (bookedSeats.filter(function (item) {
                  return item === old_seat_number;
                }).length) {
                  _context2.next = 16;
                  break;
                }

                console.log('Your old seat number not found in booked seats!');
                res.status(404).json({
                  status: 404,
                  error: 'Seat number not found'
                });
                return _context2.abrupt("return");

              case 16:
                if (!freeSeats.filter(function (item) {
                  return item === new_seat_number;
                }).length) {
                  _context2.next = 28;
                  break;
                }

                freeSeats.splice(freeSeats.indexOf(new_seat_number), 1, old_seat_number);
                bookedSeats.splice(bookedSeats.indexOf(old_seat_number), 1, new_seat_number); // console.log(oldSeatNumber, newSeatNumber);
                // console.log(freeSeats.filter(item => item === newSeatNumber));
                // console.log(freeSeats.filter(item => item === oldSeatNumber));
                // console.log(freeSeats, bookedSeats);

                _context2.next = 21;
                return _connect["default"].query(updateSeatsOnTrip, [bookedSeats.length, freeSeats, bookedSeats, trip_id]);

              case 21:
                updateTrip = _context2.sent;
                _context2.next = 24;
                return _connect["default"].query(updateSeatsOnBooking, [new_seat_number, booking_id]);

              case 24:
                seatChanged = _context2.sent;

                if (seatChanged) {
                  res.status(200).json({
                    status: 200,
                    data: rows[0],
                    message: "Your seat number has been changed from ".concat(old_seat_number, " to ").concat(new_seat_number)
                  });
                }

                _context2.next = 29;
                break;

              case 28:
                res.status(404).json({
                  status: 404,
                  error: 'Please reconfirm new seat number, the seat may have just been taken!'
                });

              case 29:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function changeSeat(_x3, _x4) {
        return _changeSeat.apply(this, arguments);
      }

      return changeSeat;
    }()
  }]);

  return BookingController;
}();

module.exports = BookingController;