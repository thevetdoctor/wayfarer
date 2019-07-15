"use strict";

var _regeneratorRuntime = _interopRequireDefault(require("regenerator-runtime"));

var _connect = _interopRequireDefault(require("../db/connect"));

var _userQueries = _interopRequireDefault(require("../helpers/queries/userQueries"));

var _hashToken = require("../helpers/hashToken");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var createUserQuery = _userQueries["default"].createUserQuery,
    findUserQuery = _userQueries["default"].findUserQuery;

var User =
/*#__PURE__*/
function () {
  function User(email, first_name, last_name, password) {
    _classCallCheck(this, User);

    this.id = null;
    this.email = email;
    this.first_name = first_name;
    this.last_name = last_name;
    this.password = password;
    this.is_admin = null;
  }

  _createClass(User, [{
    key: "find",
    value: function () {
      var _find = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime["default"].mark(function _callee(email) {
        var _ref, rows;

        return _regeneratorRuntime["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _connect["default"].query(findUserQuery, [this.email]);

              case 2:
                _ref = _context.sent;
                rows = _ref.rows;
                return _context.abrupt("return", rows[0]);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function find(_x) {
        return _find.apply(this, arguments);
      }

      return find;
    }()
  }, {
    key: "create",
    value: function () {
      var _create = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime["default"].mark(function _callee2(details, res) {
        var _ref2, rows, newUser, token, userDetails;

        return _regeneratorRuntime["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _connect["default"].query(createUserQuery, this.details);

              case 2:
                _ref2 = _context2.sent;
                rows = _ref2.rows;
                newUser = rows[0]; // remove the associated password before creating a user token

                delete newUser.password; // get token with user credentials

                token = (0, _hashToken.getToken)(newUser);
                userDetails = {
                  user_id: newUser.id,
                  is_admin: newUser.is_admin,
                  token: token
                }; // declare status code for successful response

                res.status(201).json({
                  status: 201,
                  data: userDetails
                });

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function create(_x2, _x3) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "confirmPass",
    value: function confirmPass(loggedUser, password, res) {
      // if (loggedUser) {
      // console.log(loggedUser.password, this.password);
      var compared = (0, _hashToken.getCompared)(this.password, loggedUser.password);

      if (compared) {
        /* eslint-disable no-param-reassign */
        delete loggedUser.password;
        var token = (0, _hashToken.getToken)(loggedUser);
        var loggedDetails = {
          user_id: loggedUser.id,
          is_admin: loggedUser.is_admin,
          token: token
        };
        res.status(200).json({
          status: 200,
          data: loggedDetails
        });
      } else {
        res.status(400).json({
          status: 400,
          error: 'Password is invalid'
        });
      } // }

    }
  }]);

  return User;
}();

module.exports = User;