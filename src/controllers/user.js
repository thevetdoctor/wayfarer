/* eslint-disable no-console */
import db from '../db/connect';
import User from '../models/user';
import { getHash } from '../helpers/hashToken';


const getUserQuery = 'SELECT * FROM users ORDER BY id DESC';


class UserController {
//
  // 1. static method to create a new user
  static createUser(req, res) {
    const {
      email,
      firstName,
      lastName,
      password,
    } = req.body;


    const user = new User(email, firstName, lastName);

    user.find(user.email)
      .then((found) => {
        // console.log(found);
        if (found) {
          res.status(400).json({
            status: 400,
            error: 'Email already exist',
          });
          // return;
        } else {
          console.log('New email!');

          // Hash the password with bcrypt
          const hash = getHash(password);

          user.details = [user.email, user.firstName, user.lastName, hash];

          user.create(user.details, res);
        }
      });
  }


  // 2. sign in a registered user
  static signIn(req, res) {
    const {
      email, password,
    } = req.body;

    const user = new User(email, '', '', password);

    user.find(user.email)
      .then((found) => {
        if (!found) {
          res.status(400).json({
            status: 400,
            error: 'Email is invalid',
          });
          return;
        }
        console.log('Email found');
        // console.log(found);
        // console.log(user.password);
        user.confirmPass(found, user.password, res);
      });
  }


  static getUsers(req, res) {
    db.query(getUserQuery)
      .then((result) => {
        if (result.rows.length < 1) {
          res.status(404).json({
            status: 404,
            message: 'No user on record',
          });
          return;
        }

        const users = result.rows.map(user => (
          {
            id: user.id,
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            is_admin: user.is_admin,
          }));

        res.status(200).json({
          status: 200,
          data: users,
        });
      })
      .catch((err) => {
        console.log(err);

        res.status(400).json({
          status: 400,
          err,
        });
      });
  }
}


export default UserController;
