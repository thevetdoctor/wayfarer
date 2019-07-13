"use strict";

var _connect = _interopRequireDefault(require("../db/connect"));

var _tripQueries = _interopRequireDefault(require("../helpers/tripQueries"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var createTripQuery = _tripQueries["default"].createTripQuery,
    findBusQuery = _tripQueries["default"].findBusQuery,
    getAllTripsQuery = _tripQueries["default"].getAllTripsQuery,
    checkTripQuery = _tripQueries["default"].checkTripQuery,
    cancelTripQuery = _tripQueries["default"].cancelTripQuery,
    filterByOriginQuery = _tripQueries["default"].filterByOriginQuery,
    filterByDestinationQuery = _tripQueries["default"].filterByDestinationQuery;

var Trip =
/*#__PURE__*/
function () {
  function Trip(busId, origin, destination, fare) {
    _classCallCheck(this, Trip);

    this.id = null;
    this.busId = busId;
    this.origin = origin;
    this.destination = destination;
    this.tripDate = null;
    this.fare = fare;
    this.status = null;
  }

  _createClass(Trip, [{
    key: "findBus",
    value: function () {
      var _findBus = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(busId) {
        var _ref, rows;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _connect["default"].query(findBusQuery, [this.busId]);

              case 2:
                _ref = _context.sent;
                rows = _ref.rows;
                return _context.abrupt("return", rows);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function findBus(_x) {
        return _findBus.apply(this, arguments);
      }

      return findBus;
    }()
  }, {
    key: "alreadyAssigned",
    value: function alreadyAssigned(bus, res) {
      // //
      return res.status(404).json({
        status: 404,
        error: "Bus with ID ".concat(this.busId, " & PLATE-NUMBER ").concat(bus[0].plate_number, " is already assigned")
      });
    }
  }, {
    key: "create",
    value: function () {
      var _create = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(details, res) {
        var _ref2, rows;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _connect["default"].query(createTripQuery, this.details);

              case 2:
                _ref2 = _context2.sent;
                rows = _ref2.rows;
                console.log('rows', rows);
                return _context2.abrupt("return", res.status(201).json({
                  status: 201,
                  data: 'Trip created'
                }));

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function create(_x2, _x3) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }], [{
    key: "getAll",
    value: function () {
      var _getAll = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var _ref3, rows;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _connect["default"].query(getAllTripsQuery);

              case 2:
                _ref3 = _context3.sent;
                rows = _ref3.rows;
                return _context3.abrupt("return", rows);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getAll() {
        return _getAll.apply(this, arguments);
      }

      return getAll;
    }()
  }, {
    key: "showAll",
    value: function showAll(rows, res) {
      var trips = rows.map(function (item) {
        return {
          trip_id: item.id,
          bus_id: item.bus_id,
          origin: item.origin,
          destination: item.destination,
          trip_date: item.trip_date,
          booking_status: item.booking_status,
          free_seats: item.free_seats,
          booked_seats: item.booked_seats,
          passengers: item.passengers,
          fare: item.fare,
          status: item.status
        };
      });
      res.status(200).json({
        status: 200,
        data: trips
      });
    }
  }, {
    key: "checkCancelled",
    value: function () {
      var _checkCancelled = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(tripId, res) {
        var checkedTrip, _ref4, rows;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _connect["default"].query(checkTripQuery, [tripId]);

              case 2:
                checkedTrip = _context4.sent;
                console.log('checking', checkedTrip.rows.length);

                if (!(checkedTrip.rows.length < 1)) {
                  _context4.next = 7;
                  break;
                }

                res.status(404).json({
                  status: 404,
                  error: 'Trip not found'
                });
                return _context4.abrupt("return");

              case 7:
                if (!(checkedTrip.rows[0].status === 'cancelled')) {
                  _context4.next = 10;
                  break;
                }

                res.status(404).json({
                  status: 404,
                  error: 'Already cancelled'
                });
                return _context4.abrupt("return");

              case 10:
                _context4.next = 12;
                return _connect["default"].query(cancelTripQuery, ['cancelled', tripId]);

              case 12:
                _ref4 = _context4.sent;
                rows = _ref4.rows;
                console.log('updated', rows);

                if (rows) {
                  _context4.next = 18;
                  break;
                }

                res.status(404).json({
                  status: 404,
                  error: 'Trip neither found nor updated'
                });
                return _context4.abrupt("return");

              case 18:
                res.status(205).json({
                  status: 205,
                  message: 'Trip cancelled successfully'
                });

              case 19:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function checkCancelled(_x4, _x5) {
        return _checkCancelled.apply(this, arguments);
      }

      return checkCancelled;
    }()
  }, {
    key: "filter",
    value: function () {
      var _filter = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        var origin,
            res,
            _ref5,
            rows,
            from,
            _args5 = arguments;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                origin = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : 'origin';
                res = _args5.length > 1 ? _args5[1] : undefined;
                _context5.next = 4;
                return _connect["default"].query(filterByOriginQuery, [origin]);

              case 4:
                _ref5 = _context5.sent;
                rows = _ref5.rows;

                if (rows.length > 0) {
                  console.log(origin);
                  res.status(200).json({
                    status: 200,
                    rows: rows
                  });
                } else {
                  from = origin === 'origin' ? 'from' : 'to';
                  console.log("No trips available ".concat(from, " ").concat(origin));
                  res.status(404).json({
                    status: 404,
                    message: "No trips available ".concat(from, " ").concat(origin)
                  });
                }

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function filter() {
        return _filter.apply(this, arguments);
      }

      return filter;
    }()
  }]);

  return Trip;
}();

module.exports = Trip;