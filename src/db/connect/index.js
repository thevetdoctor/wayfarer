/* eslint-disable no-console */
const { Client } = require('pg');
// const configString = require('../config');
const testConfig = require('../config/wayfare_testdb');
const { herokuconfig } = require('../config/herokuConfig');
// const { data } = require('../config/herokuConfig');
// import { Client } from 'pg';
// import configString from '../config';
// import herokuconfig from '../config/herokuConfig';


let db;

if (process.env.NODE_ENV === 'production') {
  console.log('heroku wayfare DB');
  console.log(herokuconfig);
  db = new Client({
    connectionString: herokuconfig,
    ssl: true,
  });
// } else if (process.env.NODE_ENV === 'test ') {
  // console.log('wayfare_test DB');
  // db = new Client(testConfig);
} else {
  // console.log('wayfare DB');
  console.log('wayfare_test DB');
  // db = new Client(herokuconfig);
  db = new Client(testConfig);
  // db = new Client(data);
}

db.connect();


module.exports = db;
