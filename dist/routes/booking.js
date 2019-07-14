"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _booking = _interopRequireDefault(require("../controllers/booking"));

var _auth = _interopRequireDefault(require("../auth"));

var _ownerAuth = _interopRequireDefault(require("../auth/ownerAuth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/', _auth["default"], _booking["default"].createBooking);
router.get('/', _auth["default"], _ownerAuth["default"], _booking["default"].getBookings);
router["delete"]('/:booking_id', _auth["default"], _ownerAuth["default"], _booking["default"].deleteBooking);
router.get('/swap/:booking_id', _auth["default"], _ownerAuth["default"], _booking["default"].checkAvailableSeats);
router.patch('/:booking_id', _auth["default"], _ownerAuth["default"], _booking["default"].changeSeat);
var _default = router;
exports["default"] = _default;