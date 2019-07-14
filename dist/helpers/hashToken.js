"use strict";

/* eslint-disable no-console */
// import regeneratorRuntime from 'regenerator-runtime';
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
}; // import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
// import codes from '../auth/codes';
// const getHasg = async (password) => bcrypt.hashSync(password, 10).catch(err => console.log(err));
// const getToken = async (user) => {
//   try {
//     const res = jwt.sign({ user }, codes.secretKey, { expiresIn: '2h' });
//     return res;
//   } catch (err) {
//     console.log(err);
//   }
//   return true;
// };