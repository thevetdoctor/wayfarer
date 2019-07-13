"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* eslint-disable no-unused-vars */

/* eslint-disable no-console */
var db = require('../connect');

var dropQuery = require('./dropQuery');

var createQuery = require('./tableQuery');

var seedQuery = require('./seedQuery');

var migrate =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var drop, create, seed;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return db.query(dropQuery).then(function (result) {
              return console.log('Tables dropped');
            })["catch"](function (err) {
              return console.log(err);
            });

          case 2:
            drop = _context.sent;
            _context.next = 5;
            return db.query(createQuery).then(function (result) {
              return console.log('Tables created');
            })["catch"](function (err) {
              return console.log(err);
            });

          case 5:
            create = _context.sent;
            _context.next = 8;
            return db.query(seedQuery).then(function (result) {
              return console.log('Tables seeded');
            })["catch"](function (err) {
              return console.log(err);
            });

          case 8:
            seed = _context.sent;

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function migrate() {
    return _ref.apply(this, arguments);
  };
}();

migrate();
module.exports = migrate;