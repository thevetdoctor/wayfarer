"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("./user"));

var _trip = _interopRequireDefault(require("./trip"));

var _booking = _interopRequireDefault(require("./booking"));

var _bus = _interopRequireDefault(require("./bus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(app) {
  // Declare Routes
  app.use('/api/v1/auth', _user["default"]);
  app.use('/api/v1/trips', _trip["default"]);
  app.use('/api/v1/bookings', _booking["default"]);
  app.use('/api/v1/buses', _bus["default"]);
};

exports["default"] = _default;