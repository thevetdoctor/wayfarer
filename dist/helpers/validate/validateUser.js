"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/* eslint-disable prefer-const */

/* eslint-disable no-console */

/* eslint-disable no-restricted-syntax */

/* eslint-disable guard-for-in */

/* eslint-disable camelcase */

/* eslint-disable no-useless-escape */
// import removeWhitespace from './removeWhitespace';
var validateEmail = function validateEmail(email) {
  // copied from  https://www.freeformatter.com/regex-tester.html
  var validEmail = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/.test(email) && email.trim() !== '';
  return validEmail;
};

var validatePassword = function validatePassword(password) {
  var validPassword = typeof password === 'string' && password.trim() !== '' && password.trim().length >= 6;
  return validPassword;
}; // const mobileRegex = /[^0-9]/;


var specialCharacters = /[.*&%£$"!@"]/;
var validateUser = {
  validateSignup: function validateSignup(req, res, next) {
    var _req$body = req.body,
        email = _req$body.email,
        first_name = _req$body.first_name,
        last_name = _req$body.last_name,
        password = _req$body.password;
    console.log('entered validation');

    if (email === undefined || email === '') {
      res.status(400).json({
        status: 400,
        error: 'Email not supplied'
      });
      return;
    }

    if (first_name === undefined || first_name.trim() === '') {
      res.status(400).json({
        status: 400,
        error: 'Firstname not supplied'
      });
      return;
    }

    if (last_name === undefined || last_name.trim() === '') {
      res.status(400).json({
        status: 400,
        error: 'Lastname not supplied'
      });
      return;
    }

    if (password === undefined || password === '') {
      res.status(400).json({
        status: 400,
        error: 'Password not supplied'
      });
      return;
    }

    if (!validateEmail(email)) {
      res.status(400).json({
        status: 400,
        error: 'Invalid Email'
      });
      return;
    }

    if (!validatePassword(password)) {
      res.status(400).json({
        status: 400,
        error: 'Password must be minimum of 6 characters'
      });
      return;
    }

    if (specialCharacters.test(first_name)) {
      res.status(400).json({
        status: 400,
        error: 'No special chacacters allowed'
      });
      return;
    }

    if (specialCharacters.test(last_name)) {
      res.status(400).json({
        status: 400,
        error: 'No special chacacters allowed'
      });
      return;
    }

    console.log('passed validation');
    next();
  },
  validateSignin: function validateSignin(req, res, next) {
    var _req$body2 = req.body,
        email = _req$body2.email,
        password = _req$body2.password;

    if (email === undefined) {
      res.status(400).json({
        status: 400,
        error: 'Email not supplied'
      });
      return;
    }

    if (password === undefined) {
      res.status(400).json({
        status: 400,
        error: 'Password not supplied'
      });
      return;
    }

    if (!validateEmail(email)) {
      res.status(400).json({
        status: 400,
        error: 'Invalid Email'
      });
      return;
    }

    if (!validatePassword(password)) {
      res.status(400).json({
        status: 400,
        error: 'Password must be minimum of 6 characters'
      });
      return;
    }

    next();
  }
};
var _default = validateUser;
exports["default"] = _default;