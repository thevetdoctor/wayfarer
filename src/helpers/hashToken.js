const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const codes = require('../auth/codes');


const getHash = password => bcrypt.hashSync(password, 10);

const getToken = user => jwt.sign({ user }, codes.secretKey, { expiresIn: '2h' });

const getCompared = (password, hashed) => bcrypt.compareSync(password, hashed);


module.exports = { getHash, getToken, getCompared };
