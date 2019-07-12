"use strict";

var _bus = _interopRequireDefault(require("../models/bus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BusController =
/*#__PURE__*/
function () {
  function BusController() {
    _classCallCheck(this, BusController);
  }

  _createClass(BusController, null, [{
    key: "getBuses",
    // 1. get a list of all buses
    value: function getBuses(req, res) {
      _bus["default"].getAll().then(function (buses) {
        // console.log(buses);
        if (buses.length < 1) {
          res.status(204).json({
            status: 204,
            data: 'No trips available'
          });
        } else {
          _bus["default"].showAll(buses, res);
        }
      });
    }
  }]);

  return BusController;
}();

module.exports = BusController;