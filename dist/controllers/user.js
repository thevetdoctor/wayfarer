"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _connect = _interopRequireDefault(require("../db/connect"));

var _user = _interopRequireDefault(require("../models/user"));

var _hashToken = require("../helpers/hashToken");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var getUserQuery = 'SELECT * FROM users ORDER BY id DESC';

var UserController =
/*#__PURE__*/
function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: "createUser",
    //
    // 1. static method to create a new user
    value: function createUser(req, res) {
      var _req$body = req.body,
          email = _req$body.email,
          first_name = _req$body.first_name,
          last_name = _req$body.last_name,
          password = _req$body.password;
      var user = new _user["default"](email, first_name, last_name);
      user.find(user.email).then(function (found) {
        // console.log(found);
        if (found) {
          res.status(400).json({
            status: 400,
            error: 'Email already exist'
          }); // return;
        } else {
          console.log('New email!'); // Hash the password with bcrypt

          var hash = (0, _hashToken.getHash)(password);
          user.details = [user.email, user.first_name, user.last_name, hash];
          user.create(user.details, res);
        }
      });
    } // 2. sign in a registered user

  }, {
    key: "signIn",
    value: function signIn(req, res) {
      var _req$body2 = req.body,
          email = _req$body2.email,
          password = _req$body2.password;
      var user = new _user["default"](email, '', '', password);
      user.find(user.email).then(function (found) {
        if (!found) {
          res.status(400).json({
            status: 400,
            error: 'Email is invalid'
          });
          return;
        }

        console.log('Email found'); // console.log(found);
        // console.log(user.password);

        user.confirmPass(found, user.password, res);
      });
    }
  }, {
    key: "getUsers",
    value: function getUsers(req, res) {
      _connect["default"].query(getUserQuery).then(function (result) {
        if (result.rows.length < 1) {
          res.status(404).json({
            status: 404,
            message: 'No user on record'
          });
          return;
        }

        var users = result.rows.map(function (user) {
          return {
            id: user.id,
            name: "".concat(user.first_name, " ").concat(user.last_name),
            email: user.email,
            is_admin: user.is_admin
          };
        });
        res.status(200).json({
          status: 200,
          data: users
        });
      })["catch"](function (err) {
        console.log(err);
        res.status(400).json({
          status: 400,
          err: err
        });
      });
    }
  }]);

  return UserController;
}();

var _default = UserController;
exports["default"] = _default;