/* eslint-disable no-console */
import userQueries from '../helpers/userQueries';
import db from '../db/connect';
import { getHash, getToken } from '../helpers/hashToken';

const { createUserQuery, findUserQuery } = userQueries;


class UserController {
  // static method to create a new user

  static createUser(req, res) {
    const {
      email,
      firstName,
      lastName,
      password,
    } = req.body;

    const user = [email, firstName, lastName];

    // check if the user exists in the records
    db.query(findUserQuery, [email])
      .then((result1) => {
        if (result1.rows[0]) {
          res.status(400).json({
            status: 400,
            error: 'Email already exist',
          });
          return;
        }

        // Hash the password with bcrypt
        const hash = getHash(password);

        // create new user and store credentials in the records
        db.query(createUserQuery, [...user, hash])
          .then((result2) => {
            const newUser = result2.rows[0];

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
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json({
              status: 400,
              err,
            });
          });
      })
      .catch((err) => {
        res.status(400).json({
          status: 400,
          err,
        });
      });
  }
}


export default UserController;
