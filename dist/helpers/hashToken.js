"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _codes = _interopRequireDefault(require("../auth/codes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getHash = function getHash(password) {
  return _bcrypt["default"].hashSync(password, 10);
};

var getToken = function getToken(user) {
  return _jsonwebtoken["default"].sign({
    user: user
  }, _codes["default"].secretKey, {
    expiresIn: '2h'
  });
};

var getCompared = function getCompared(password, hashed) {
  return _bcrypt["default"].compareSync(password, hashed);
};

var _default = {
  getHash: getHash,
  getToken: getToken,
  getCompared: getCompared
};
exports["default"] = _default;