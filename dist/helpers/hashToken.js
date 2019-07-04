"use strict";

var jwt = require('jsonwebtoken');

var bcrypt = require('bcrypt');

var codes = require('../auth/codes');

var getHash = function getHash(password) {
  var hash = bcrypt.hashSync(password, 10);
  return hash;
};

var getToken = function getToken(user) {
  var token = jwt.sign({
    user: user
  }, codes.secretKey, {
    expiresIn: '2h'
  });
  return token;
};

var getCompared = function getCompared(password, hashed) {
  var compared = bcrypt.compareSync(password, hashed);
  return compared;
};

module.exports = {
  getHash: getHash,
  getToken: getToken,
  getCompared: getCompared
};