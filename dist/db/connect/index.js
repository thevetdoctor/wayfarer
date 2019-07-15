"use strict";

/* eslint-disable no-console */
var _require = require('pg'),
    Client = _require.Client; // const configString = require('../config');


var testConfig = require('../config/wayfare_testdb');

var herokuConfig = require('../config/herokuConfig'); // const { data } = require('../config/herokuConfig');
// import { Client } from 'pg';
// import configString from '../config';
// import herokuconfig from '../config/herokuConfig';


var db;

if (process.env.NODE_ENV !== 'production') {
  console.log('heroku wayfare DB');
  console.log('heroku config', herokuConfig);
  db = new Client({
    connectionString: herokuConfig,
    ssl: true
  }); // } else if (process.env.NODE_ENV === 'test ') {
  // console.log('wayfare_test DB');
  // db = new Client(testConfig);
} else {
  // console.log('wayfare DB');
  console.log('wayfare_test DB'); // db = new Client(herokuconfig);

  db = new Client(testConfig); // db = new Client(data);
}

db.connect();
module.exports = db;