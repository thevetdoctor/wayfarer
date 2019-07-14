"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bus = _interopRequireDefault(require("../controllers/bus"));

var _auth = _interopRequireDefault(require("../auth"));

var _adminAuth = _interopRequireDefault(require("../auth/adminAuth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/', _auth["default"], _adminAuth["default"], _bus["default"].getBuses);
var _default = router;
exports["default"] = _default;