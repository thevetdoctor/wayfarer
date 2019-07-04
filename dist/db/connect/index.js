"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = require("pg");

var _config = _interopRequireDefault(require("../config"));

var _herokuConfig = _interopRequireDefault(require("../config/herokuConfig"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var db;

if (process.env.NODE_ENV === 'production') {
  db = new _pg.Client({
    connectionString: _herokuConfig["default"],
    ssl: true
  });
} else {
  db = new _pg.Client(_config["default"]);
}

db.connect();
var _default = db;
exports["default"] = _default;