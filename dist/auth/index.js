"use strict";

/* eslint-disable no-console */
var jwt = require('jsonwebtoken');

var codes = require('./codes');

var auth = function auth(req, res, next) {
  var bearerHeader = req.headers.authorization;

  if (typeof bearerHeader !== 'undefined') {
    var token = bearerHeader.split(' ')[1];
    req.token = token;
    jwt.verify(req.token, codes.secretKey, function (err, decoded) {
      if (err) {
        res.status(403).json({
          status: 403,
          error: "Not authorised, ".concat(err)
        });
        return;
      }

      req.token = decoded.user;
      console.log("User with email: '".concat(req.token.email, "' has ").concat(req.token.is_admin ? 'admin' : 'no admin', " access")); // if (!req.token.is_admin) {
      //   console.log('Admin access only');
      //   res.status(403).json({
      //     status: 403,
      //     error: 'Admin access only',
      //   });
      //   return;
      // }

      next();
    });
  } else {
    console.log('no token supplied');
    res.status(403).json({
      status: 403,
      error: 'Not authorised'
    });
  }
};

module.exports = auth;