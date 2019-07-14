/* eslint-disable no-console */
const admin = (req, res, next) => {
  if (!req.token.is_admin) {
    console.log('Admin access only');
    res.status(403).json({
      status: 403,
      error: 'Admin access only',
    });
    return;
  }
  next();
};


export default admin;
