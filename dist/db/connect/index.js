"use strict";

/* eslint-disable no-console */
var _require = require('pg'),
    Client = _require.Client; // const configString = require('../config');


var testConfig = require('../config/wayfare_testdb');

var _require2 = require('../config/herokuConfig'),
    herokuconfig = _require2.herokuconfig; // const { data } = require('../config/herokuConfig');
// import { Client } from 'pg';
// import configString from '../config';
// import herokuconfig from '../config/herokuConfig';


var db;

if (process.env.NODE_ENV !== 'production') {
  console.log('heroku wayfare DB');
  db = new Client({
    connectionString: herokuconfig,
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