"use strict";

var _bookingQueries = _interopRequireDefault(require("../helpers/bookingQueries"));

var _booking = _interopRequireDefault(require("../models/booking"));

var _connect = _interopRequireDefault(require("../db/connect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var checkUserQuery = _bookingQueries["default"].checkUserQuery,
    getTripsQuery = _bookingQueries["default"].getTripsQuery,
    updateTripQuery = _bookingQueries["default"].updateTripQuery,
    bookingQuery = _bookingQueries["default"].bookingQuery,
    checkBookingQuery = _bookingQueries["default"].checkBookingQuery,
    getBookingQuery = _bookingQueries["default"].getBookingQuery,
    deleteBookingQuery = _bookingQueries["default"].deleteBookingQuery,
    updateTripWithDeletedBookingQuery = _bookingQueries["default"].updateTripWithDeletedBookingQuery,
    deletedBookingQuery = _bookingQueries["default"].deletedBookingQuery,
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
      var _req$body = req.body,
          token = _req$body.token,
          userId = _req$body.userId,
          isAdmin = _req$body.isAdmin,
          tripId = _req$body.tripId; // const newBooking = new Booking(userId, tripId);

      var updateData = [tripId];
      var bookingData = [userId, tripId];

      _connect["default"].query(checkUserQuery).then(function (result) {
        var foundUser = result.rows.filter(function (user) {
          return user.id === parseInt(userId, 10);
        });

        if (foundUser.length < 1) {
          res.status(404).json({
            status: 404,
            error: 'User not registered'
          });
          return;
        }

        _connect["default"].query(getTripsQuery, [tripId]).then(function (result1) {
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
      var _req$body2 = req.body,
          token = _req$body2.token,
          userId = _req$body2.userId,
          isAdmin = _req$body2.isAdmin;

      _connect["default"].query(getBookingQuery).then(function (result) {
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
            trip_id: item.trip_id,
            user_id: item.user_id,
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
      var _req$body3 = req.body,
          token = _req$body3.token,
          userId = _req$body3.userId,
          isAdmin = _req$body3.isAdmin;
      var bookingId = req.params.bookingId; // console.log(bookingId, userId);

      var checkData = [userId, bookingId];

      _connect["default"].query(checkBookingQuery, checkData).then(function (result1) {
        if (result1.rows.length < 1) {
          res.status(404).json({
            status: 404,
            error: 'No such booking found'
          });
          return;
        }

        _connect["default"].query(deleteBookingQuery, [bookingId]).then(function (result2) {
          var data = result2.rows[0]; // console.log(data);

          if (data === undefined) {
            res.status(404).json({
              status: 404,
              error: 'Booking found but not deleted'
            });
            return;
          } // console.log('tripId', result1.rows[0].trip_id);


          var updateTripWithDeletedBookingData = [1, result1.rows[0].trip_id];

          _connect["default"].query(updateTripWithDeletedBookingQuery, updateTripWithDeletedBookingData).then(function (result3) {
            var deleted = result3.rows; // console.log(deleted);

            var deletedBookingData = Object.values(data); // console.log(deletedBookingData);

            _connect["default"].query(deletedBookingQuery, deletedBookingData).then(function (result4) {
              // console.log(result4.rows);
              res.status(200).json({
                status: 200,
                message: 'Booking deleted successfully'
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
        var _req$body4, token, userId, isAdmin, bookingId, _ref, rows, seats, oldSeatNumber, freeSeats, bookedSeats, availableSeats;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body4 = req.body, token = _req$body4.token, userId = _req$body4.userId, isAdmin = _req$body4.isAdmin;
                bookingId = req.params.bookingId;
                _context.next = 4;
                return _connect["default"].query(checkTrip, [bookingId, userId]);

              case 4:
                _ref = _context.sent;
                rows = _ref.rows;

                if (!rows.length) {
                  _context.next = 17;
                  break;
                }

                console.log('bookingId ->', bookingId);
                console.log('tripId ->', rows[0].trip_id);
                _context.next = 11;
                return _connect["default"].query(checkSeats, [rows[0].trip_id]);

              case 11:
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

                _context.next = 19;
                break;

              case 17:
                console.log('Booking not found!');
                res.status(404).json({
                  status: 404,
                  error: 'Booking not found!'
                });

              case 19:
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
        var tripId, _req$body5, oldSeatNumber, newSeatNumber, bookingId, _ref2, rows, freeSeats, bookedSeats, updateTrip, seatChanged;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                tripId = req.body.tripId;
                _req$body5 = req.body, oldSeatNumber = _req$body5.oldSeatNumber, newSeatNumber = _req$body5.newSeatNumber;
                bookingId = req.params.bookingId;
                oldSeatNumber = parseInt(oldSeatNumber, 10);
                newSeatNumber = parseInt(newSeatNumber, 10);
                _context2.next = 7;
                return _connect["default"].query(checkSeatsOnTrip, [tripId]);

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
                  return item === oldSeatNumber;
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
                  return item === newSeatNumber;
                }).length) {
                  _context2.next = 28;
                  break;
                }

                freeSeats.splice(freeSeats.indexOf(newSeatNumber), 1, oldSeatNumber);
                bookedSeats.splice(bookedSeats.indexOf(oldSeatNumber), 1, newSeatNumber); // console.log(oldSeatNumber, newSeatNumber);
                // console.log(freeSeats.filter(item => item === newSeatNumber));
                // console.log(freeSeats.filter(item => item === oldSeatNumber));
                // console.log(freeSeats, bookedSeats);

                _context2.next = 21;
                return _connect["default"].query(updateSeatsOnTrip, [bookedSeats.length, freeSeats, bookedSeats, tripId]);

              case 21:
                updateTrip = _context2.sent;
                _context2.next = 24;
                return _connect["default"].query(updateSeatsOnBooking, [newSeatNumber, bookingId]);

              case 24:
                seatChanged = _context2.sent;

                if (seatChanged) {
                  res.status(200).json({
                    status: 200,
                    data: rows[0],
                    message: "Your seat number has been changed from ".concat(oldSeatNumber, " to ").concat(newSeatNumber)
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

module.exports = BookingController; // static createBooking(req, res) {
//     const {
//       token, userId, isAdmin, tripId,
//     } = req.body;
//     // const newBooking = new Booking(userId, tripId);
//     const updateData = [tripId];
//     const bookingData = [userId, tripId];
//     db.query(checkUser)
//       .then((result) => {
//         const foundUser = result.rows.filter(user => user.id === parseInt(userId, 10));
//         if (foundUser.length < 1) {
//           res.status(404).json({
//             status: 404,
//             error: 'User not registered',
//           });
//           return;
//         }
//         db.query(getTripsQuery, [tripId])
//           .then((result1) => {
//             const foundTrip = result1.rows[0];
//             if (!foundTrip) {
//               res.status(404).json({
//                 status: 404,
//                 error: 'Trip is not available',
//               });
//               return;
//             }
//             if (foundTrip.status === 'cancelled') {
//               res.status(404).json({
//                 status: 404,
//                 error: 'Trip has been cancelled',
//               });
//               return;
//             }
//             if (foundTrip.booking_status === foundTrip.capacity) {
//               res.status(404).json({
//                 status: 404,
//                 error: 'Sorry please, No more empty seats- Trip is fully booked',
//               });
//               return;
//             }
//             db.query(checkBookingQuery, bookingData)
//               .then((result2) => {
//                 const tripBooked = result2.rows[0];
//                 if (tripBooked) {
//                   res.status(404).json({
//                     status: 404,
//                     error: 'You are booked on this trip already',
//                   });
//                   return;
//                 }
//                 db.query(updateTripQuery, updateData)
//                   .then((result3) => {
//                     const tripUpdate = result3.rows[0];
//                     const seatNo = tripUpdate.booked_seats[tripUpdate.booked_seats.length - 1];
//                     console.log(seatNo);
//                     const moreBookingData = [foundTrip.bus_id, foundTrip.origin, foundTrip.destination, tripUpdate.trip_date, seatNo];
//                     const completeBookingData = [...bookingData, ...moreBookingData];
//                     db.query(bookingQuery, completeBookingData)
//                       .then((result4) => {
//                         const booking = result4.rows[0];
//                         const data = {
//                           booking_id: booking.id,
//                           trip_id: booking.trip_id,
//                           user_id: booking.user_id,
//                           bus_id: booking.bus_id,
//                           origin: booking.origin,
//                           destination: booking.destination,
//                           trip_date: tripUpdate.trip_date,
//                           seat_number: tripUpdate.booking_status,
//                           message: 'Your trip has been booked',
//                         };
//                         res.status(201).json({
//                           status: 201,
//                           data,
//                         });
//                       })
//                       .catch(err => console.log(err));
//                   })
//                   .catch(err => console.log(err));
//               })
//               .catch(err => console.log(err));
//           })
//           .catch(err => console.log(err));
//       })
//       .catch(err => console.log(err));
// }
// ///////////////////////////////////////////
// const {
//   token, userId, isAdmin, tripId,
// } = req.body;
// const newBooking = new Booking(userId, tripId);
// const updateData = [tripId];
// const bookingData = [userId, tripId];
// newBooking.userCheck(userId)
//   .then((foundUser) => {
//     if (foundUser.length < 1) {
//       newBooking.notRegistered(res);
//     } else {
//       console.log('foundUser', foundUser);
//       newBooking.checkTrip(tripId, res)
//         .then((foundTrip) => {
//           newBooking.tripResponse(foundTrip, res);
//           // console.log(foundTrip);
//           newBooking.checkBooking(res)
//             .then((booked) => {
//               console.log(booked);
//               if (booked.length > 0) {
//                 newBooking.alreadyBooked(res);
//                 return;
//               }
//               newBooking.updateTrip()
//                 .then((tripUpdate) => {
//                   console.log(tripUpdate);
//                   const seatNo = tripUpdate.booked_seats[tripUpdate.booked_seats.length - 1];
//                   console.log(seatNo);
//                   const moreBookingData = [foundTrip.bus_id, foundTrip.origin, foundTrip.destination, tripUpdate.trip_date, seatNo];
//                   const completeBookingData = [...bookingData, ...moreBookingData];
//                   newBooking.makeBooking(tripUpdate, completeBookingData, res)
//                     .then((tripBooked) => {
//                       console.log(tripBooked);
//                     });
//                 });
//             });
//         });
//     }
//   });