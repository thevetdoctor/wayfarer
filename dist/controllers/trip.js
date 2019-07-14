"use strict";

var _tripQueries = _interopRequireDefault(require("../helpers/queries/tripQueries"));

var _trip = _interopRequireDefault(require("../models/trip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import db from '../db/connect';
var cancelTripQuery = _tripQueries["default"].cancelTripQuery,
    filterQuery = _tripQueries["default"].filterQuery;

var TripController =
/*#__PURE__*/
function () {
  function TripController() {
    _classCallCheck(this, TripController);
  }

  _createClass(TripController, null, [{
    key: "createTrip",
    // 1. create a new trip
    value: function createTrip(req, res) {
      // const { token, user_id, is_admin } = req.body;
      var _req$body = req.body,
          bus_id = _req$body.bus_id,
          origin = _req$body.origin,
          destination = _req$body.destination,
          fare = _req$body.fare;
      var trip = new _trip["default"](bus_id, origin, destination, fare);
      trip.findBus(trip.bus_id, res).then(function (bus) {
        if (!bus.length) {
          res.status(400).json({
            status: 400,
            error: "Bus with ID ".concat(trip.bus_id, " not registered")
          });
        } else {
          var tripActive = bus.filter(function (eachtrip) {
            return eachtrip.status === 'active';
          });

          if (tripActive.length) {
            return trip.alreadyAssigned(tripActive, res);
          }

          trip.details = [trip.bus_id, trip.origin, trip.destination, trip.fare];
          trip.create(trip.details, res);
        }
      });
    } // 2. get a list of all trips

  }, {
    key: "getTrips",
    value: function getTrips(req, res) {
      _trip["default"].getAll().then(function (trips) {
        // console.log(trips);
        if (trips.length < 1) {
          res.status(204).json({
            status: 204,
            data: 'No trips available'
          });
        } else {
          _trip["default"].showAll(trips, res);
        }
      });
    } // 3. cancel an active trip

  }, {
    key: "cancelTrip",
    value: function cancelTrip(req, res) {
      var _req$body2 = req.body,
          token = _req$body2.token,
          user_id = _req$body2.user_id,
          is_admin = _req$body2.is_admin;
      var trip_id = req.params.trip_id;

      _trip["default"].checkCancelled(trip_id, res);
    } // 4. filter trips based on origin & destination

  }, {
    key: "filterTrip",
    value: function () {
      var _filterTrip = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body3, token, user_id, is_admin, search, _req$query, origin, destination;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body3 = req.body, token = _req$body3.token, user_id = _req$body3.user_id, is_admin = _req$body3.is_admin;
                search = req.params.search;
                _req$query = req.query, origin = _req$query.origin, destination = _req$query.destination; // console.log(req.params);
                // console.log(req.query);
                // console.log('origin', origin);
                // console.log('destination', destination);

                if (!(search && search === 'search')) {
                  _context.next = 12;
                  break;
                }

                if (!(origin && origin !== '' && origin !== undefined)) {
                  _context.next = 7;
                  break;
                }

                _trip["default"].filter(origin, res);

                return _context.abrupt("return");

              case 7:
                if (!(destination && destination !== '' && destination !== undefined)) {
                  _context.next = 10;
                  break;
                }

                _trip["default"].filter(destination, res);

                return _context.abrupt("return");

              case 10:
                res.status(400).json({
                  status: 400,
                  error: 'No search query'
                });
                return _context.abrupt("return");

              case 12:
                res.status(400).json({
                  status: 400,
                  error: 'Incorrect search parameter'
                });

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function filterTrip(_x, _x2) {
        return _filterTrip.apply(this, arguments);
      }

      return filterTrip;
    }()
  }]);

  return TripController;
}();

module.exports = TripController;