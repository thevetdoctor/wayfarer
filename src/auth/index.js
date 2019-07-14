/* eslint-disable no-console */
const jwt = require('jsonwebtoken');
const codes = require('./codes');


const auth = (req, res, next) => {
  const bearerHeader = req.headers.authorization;

  if (typeof bearerHeader !== 'undefined') {
    const token = bearerHeader.split(' ')[1];
    req.token = token;

    jwt.verify(req.token, codes.secretKey, (err, decoded) => {
      if (err) {
        res.status(403).json({
          status: 403,
          error: `Not authorised, ${err}`,
        });
        return;
      }
      req.token = decoded.user;
      console.log(`User with email: '${req.token.email}' has ${req.token.is_admin ? 'admin' : 'no admin'} access`);

      // if (!req.token.is_admin) {
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
      error: 'Not authorised',
    });
  }
};


module.exports = auth;
