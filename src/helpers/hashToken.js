const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const codes = require('../auth/codes');


const getHash = (password) => {
  const hash = bcrypt.hashSync(password, 10);

  return hash;
};


const getToken = (user) => {
  const token = jwt.sign({ user }, codes.secretKey, { expiresIn: '2h' });

  return token;
};


const getCompared = (password, hashed) => {
  const compared = bcrypt.compareSync(password, hashed);

  return compared;
};


module.exports = { getHash, getToken, getCompared };
