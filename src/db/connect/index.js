/* eslint-disable no-console */
const { Client } = require('pg');
// const configString = require('../config');
const testConfig = require('../config/wayfare_testdb');
const herokuConfig = require('../config/herokuConfig');
// const { data } = require('../config/herokuConfig');
// import { Client } from 'pg';
// import configString from '../config';
// import herokuconfig from '../config/herokuConfig';
const elephantSql = 'postgres://lfaecjqh:Ylkv8kvpO0_KsA_LJ3VtWs1rOiQld1An@raja.db.elephantsql.com:5432/lfaecjqh';


let db;

if (process.env.NODE_ENV === 'production') {
  console.log('heroku wayfare DB');
  console.log('heroku config', herokuConfig);
  db = new Client({
    connectionString: herokuConfig,
    ssl: true,
  });
// } else if (process.env.NODE_ENV === 'test ') {
  // console.log('wayfare_test DB');
  // db = new Client(testConfig);
} else {
  // console.log('wayfare DB');
  console.log('wayfare_test DB');
  // db = new Client(herokuconfig);
  db = new Client(elephantSql);
  // db = new Client(testConfig);
  // db = new Client(data);
}

db.connect();


module.exports = db;
