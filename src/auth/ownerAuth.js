/* eslint-disable no-console */

const ownerAuth = (req, res, next) => {
  console.log('token', req.token);
  console.log('user_id from token:', req.token.id);
  // req.token.id = undefined;
  if (req.token.id || req.token.is_admin === true) {
    next();
  } else {
    res.status(403).json({
      status: 403,
      error: 'Not authorised',
    });
  }
};


export default ownerAuth;
