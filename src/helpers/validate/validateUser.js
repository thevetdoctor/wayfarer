/* eslint-disable prefer-const */
/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable camelcase */
/* eslint-disable no-useless-escape */
// import removeWhitespace from './removeWhitespace';

const validateEmail = (email) => {
  // copied from  https://www.freeformatter.com/regex-tester.html
  const validEmail = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/.test(email) && email.trim() !== '';
  return validEmail;
};

const validatePassword = (password) => {
  const validPassword = typeof password === 'string' && password.trim() !== '' && password.trim().length >= 6;
  return validPassword;
};


// const mobileRegex = /[^0-9]/;
const specialCharacters = /[.*&%£$"!@"]/;

const validateUser = {
  validateSignup: (req, res, next) => {
    let {
      email, first_name, last_name, password,
    } = req.body;

    console.log('entered validation');

    if (email === undefined || email === '') {
      res.status(400).json({
        status: 400,
        error: 'Email not supplied',
      });
      return;
    }

    if (first_name === undefined || first_name.trim() === '') {
      res.status(400).json({
        status: 400,
        error: 'Firstname not supplied',
      });
      return;
    }

    if (last_name === undefined || last_name.trim() === '') {
      res.status(400).json({
        status: 400,
        error: 'Lastname not supplied',
      });
      return;
    }


    if (password === undefined || password === '') {
      res.status(400).json({
        status: 400,
        error: 'Password not supplied',
      });
      return;
    }


    if (!validateEmail(email)) {
      res.status(400).json({
        status: 400,
        error: 'Invalid Email',
      });
      return;
    }


    if (!validatePassword(password)) {
      res.status(400).json({
        status: 400,
        error: 'Password must be minimum of 6 characters',
      });
      return;
    }

    if (specialCharacters.test(first_name)) {
      res.status(400).json({
        status: 400,
        error: 'No special chacacters allowed',
      });
      return;
    }

    if (specialCharacters.test(last_name)) {
      res.status(400).json({
        status: 400,
        error: 'No special chacacters allowed',
      });
      return;
    }

    console.log('passed validation');
    next();
  },


  validateSignin: (req, res, next) => {
    const { email, password } = req.body;

    if (email === undefined) {
      res.status(400).json({
        status: 400,
        error: 'Email not supplied',
      });
      return;
    }


    if (password === undefined) {
      res.status(400).json({
        status: 400,
        error: 'Password not supplied',
      });
      return;
    }


    if (!validateEmail(email)) {
      res.status(400).json({
        status: 400,
        error: 'Invalid Email',
      });
      return;
    }


    if (!validatePassword(password)) {
      res.status(400).json({
        status: 400,
        error: 'Password must be minimum of 6 characters',
      });
      return;
    }

    next();
  },
};


export default validateUser;
