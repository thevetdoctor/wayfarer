/* eslint-disable no-console */
const { Client } = require('pg');
const configString = require('../config');
const testConfig = require('../config/wayfare_testdb');
const herokuconfig = require('../config/herokuConfig');
// import { Client } from 'pg';
// import configString from '../config';
// import herokuconfig from '../config/herokuConfig';


let db;

if (process.env.NODE_ENV === 'production') {
  db = new Client({
    connectionString: herokuconfig,
    ssl: true,
  });
} else if (process.env.NODE_ENV === 'test ') {
  console.log('wayfare_test DB');
  db = new Client(testConfig);
} else {
  console.log('wayfare DB');
  db = new Client(configString);
}

db.connect();


module.exports = db;
