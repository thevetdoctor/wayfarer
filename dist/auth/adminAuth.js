"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/* eslint-disable no-console */
var admin = function admin(req, res, next) {
  if (!req.token.is_admin) {
    console.log('Admin access only');
    res.status(403).json({
      status: 403,
      error: 'Admin access only'
    });
    return;
  }

  next();
};

var _default = admin;
exports["default"] = _default;