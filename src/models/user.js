/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable camelcase */
import regeneratorRuntime from 'regenerator-runtime';
import db from '../db/connect';
import userQueries from '../helpers/queries/userQueries';
import { getToken, getCompared } from '../helpers/hashToken';

const { createUserQuery, findUserQuery } = userQueries;


class User {
  constructor(email, first_name, last_name, password) {
    this.id = null;
    this.email = email;
    this.first_name = first_name;
    this.last_name = last_name;
    this.password = password;
    this.is_admin = null;
  }


  async find(email) {
    // checks if the user exists in the records(by email)
    const { rows } = await db.query(findUserQuery, [this.email]);

    // console.log(rows, rows[0]);
    return rows[0];
  }


  async create(details, res) {
    // create new user and store credentials in the records
    const { rows } = await db.query(createUserQuery, this.details);
    const newUser = rows[0];

    // remove the associated password before creating a user token
    delete newUser.password;

    // get token with user credentials
    const token = getToken(newUser);
    const userDetails = { user_id: newUser.id, is_admin: newUser.is_admin, token };

    // declare status code for successful response
    res.status(201).json({
      status: 201,
      data: userDetails,
    });
  }


  confirmPass(loggedUser, password, res) {
    // if (loggedUser) {
    // console.log(loggedUser.password, this.password);
    const compared = getCompared(this.password, loggedUser.password);
    if (compared) {
      /* eslint-disable no-param-reassign */
      delete loggedUser.password;
      const token = getToken(loggedUser);
      const loggedDetails = { user_id: loggedUser.id, is_admin: loggedUser.is_admin, token };

      res.status(200).json({
        status: 200,
        data: loggedDetails,
      });
    } else {
      res.status(400).json({
        status: 400,
        error: 'Password is invalid',
      });
    }
    // }
  }
}


module.exports = User;
