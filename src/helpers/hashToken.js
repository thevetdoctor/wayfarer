/* eslint-disable no-console */
// import regeneratorRuntime from 'regenerator-runtime';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const codes = require('../auth/codes');


const getHash = password => bcrypt.hashSync(password, 10);

const getToken = user => jwt.sign({ user }, codes.secretKey, { expiresIn: '2h' });

const getCompared = (password, hashed) => bcrypt.compareSync(password, hashed);


module.exports = { getHash, getToken, getCompared };


// import jwt from 'jsonwebtoken';
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