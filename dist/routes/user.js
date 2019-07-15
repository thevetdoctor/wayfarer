"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("../controllers/user"));

var _validateUser = _interopRequireDefault(require("../helpers/validate/validateUser"));

var _auth = _interopRequireDefault(require("../auth"));

var _adminAuth = _interopRequireDefault(require("../auth/adminAuth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // router.post('/signup', UserController.createUser);


router.post('/signup', _validateUser["default"].validateSignup, _user["default"].createUser); // router.post('/signin', UserController.signIn);

router.post('/signin', _validateUser["default"].validateSignin, _user["default"].signIn);
router.get('/', _auth["default"], _adminAuth["default"], _user["default"].getUsers);
var _default = router;
exports["default"] = _default;