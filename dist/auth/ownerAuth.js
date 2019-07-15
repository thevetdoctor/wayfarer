"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/* eslint-disable no-console */
var ownerAuth = function ownerAuth(req, res, next) {
  console.log('token', req.token);
  console.log('user_id from token:', req.token.id); // req.token.id = undefined;

  if (req.token.id || req.token.is_admin === true) {
    next();
  } else {
    res.status(403).json({
      status: 403,
      error: 'Not authorised'
    });
  }
};

var _default = ownerAuth;
exports["default"] = _default;