"use strict";

var jwt = require('jsonwebtoken');

var bcrypt = require('bcrypt');

var codes = require('../auth/codes');

var getHash = function getHash(password) {
  return bcrypt.hashSync(password, 10);
};

var getToken = function getToken(user) {
  return jwt.sign({
    user: user
  }, codes.secretKey, {
    expiresIn: '2h'
  });
};

var getCompared = function getCompared(password, hashed) {
  return bcrypt.compareSync(password, hashed);
};

module.exports = {
  getHash: getHash,
  getToken: getToken,
  getCompared: getCompared
};