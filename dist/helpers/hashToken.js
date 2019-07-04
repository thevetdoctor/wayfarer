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
  var hash = _bcrypt["default"].hashSync(password, 10);

  return hash;
};

var getToken = function getToken(user) {
  var token = _jsonwebtoken["default"].sign({
    user: user
  }, _codes["default"].secretKey, {
    expiresIn: '2h'
  });

  return token;
};

var getCompared = function getCompared(password, hashed) {
  var compared = _bcrypt["default"].compareSync(password, hashed);

  return compared;
};

var _default = {
  getHash: getHash,
  getToken: getToken,
  getCompared: getCompared
};
exports["default"] = _default;