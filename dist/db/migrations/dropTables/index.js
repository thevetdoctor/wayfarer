"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _connect = _interopRequireDefault(require("../../connect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var dropUsersTable = 'DROP TABLE IF EXISTS users CASCADE;';
var dropBusesTable = 'DROP TABLE IF EXISTS buses CASCADE;';
var dropTripsTable = 'DROP TABLE IF EXISTS trips CASCADE;';
var dropBookingsTable = 'DROP TABLE IF EXISTS bookings CASCADE;';
var dropDeletedBookingsTable = 'DROP TABLE IF EXISTS deletedbookings CASCADE;';
var dropQuery = "".concat(dropUsersTable).concat(dropBusesTable).concat(dropTripsTable).concat(dropBookingsTable).concat(dropDeletedBookingsTable);

var drop =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var res;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _connect["default"].query(dropQuery).then(function (result) {
              console.log(result.rows);
              console.log('Tables dropped');
            })["catch"](function (err) {
              return console.log(err);
            });

          case 2:
            res = _context.sent;
            return _context.abrupt("return", res);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function drop() {
    return _ref.apply(this, arguments);
  };
}();

drop();
var _default = drop;
exports["default"] = _default;