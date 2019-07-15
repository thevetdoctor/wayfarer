"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regeneratorRuntime = _interopRequireDefault(require("regenerator-runtime"));

var _connect = _interopRequireDefault(require("../db/connect"));

var _busQueries = _interopRequireDefault(require("../helpers/queries/busQueries"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var getBusesQuery = _busQueries["default"].getBusesQuery;

var Bus =
/*#__PURE__*/
function () {
  function Bus(number_plate, manufacturer, model, year, capacity) {
    _classCallCheck(this, Bus);

    this.id = null;
    this.number_plate = number_plate;
    this.manufacturer = manufacturer;
    this.model = model;
    this.year = year;
    this.capacity = capacity;
  }

  _createClass(Bus, null, [{
    key: "getAll",
    value: function () {
      var _getAll = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime["default"].mark(function _callee() {
        var _ref, rows;

        return _regeneratorRuntime["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _connect["default"].query(getBusesQuery);

              case 2:
                _ref = _context.sent;
                rows = _ref.rows;
                return _context.abrupt("return", rows);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getAll() {
        return _getAll.apply(this, arguments);
      }

      return getAll;
    }()
  }, {
    key: "showAll",
    value: function showAll(rows, res) {
      var buses = rows.map(function (item) {
        return {
          bus_id: item.id,
          number_plate: item.number_plate,
          manufacturer: item.manufacturer,
          model: item.model,
          year: item.year,
          capacity: item.capacity
        };
      });
      res.status(200).json({
        status: 200,
        data: buses
      });
    }
  }]);

  return Bus;
}();

var _default = Bus;
exports["default"] = _default;