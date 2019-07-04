"use strict";

var _require = require('pg'),
    Client = _require.Client;

var configString = require('../config'); // import herokuconfig from '../config/herokuConfig';
// import { Client } from 'pg';
// import configString from '../config';
// import herokuconfig from '../config/herokuConfig';


var db;

if (process.env.NODE_ENV === 'production') {
  db = new Client({
    connectionString: herokuconfig,
    ssl: true
  });
} else {
  db = new Client(configString);
}

db.connect();
module.exports = db;