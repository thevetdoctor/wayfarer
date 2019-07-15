"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _trip = _interopRequireDefault(require("../controllers/trip"));

var _auth = _interopRequireDefault(require("../auth"));

var _adminAuth = _interopRequireDefault(require("../auth/adminAuth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/', _auth["default"], _adminAuth["default"], _trip["default"].createTrip);
router.get('/', _auth["default"], _trip["default"].getTrips);
router.patch('/:trip_id', _auth["default"], _adminAuth["default"], _trip["default"].cancelTrip);
router.get('/:search', _auth["default"], _trip["default"].filterTrip);
var _default = router;
exports["default"] = _default;