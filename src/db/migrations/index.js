/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const db = require('../connect');
const dropQuery = require('./dropQuery');
const createQuery = require('./tableQuery');
const seedQuery = require('./seedQuery');


const migrate = () => {
  db.query(`${dropQuery}${createQuery}${seedQuery}`)
    .then(result => console.log('migrations done'))
    .catch(err => console.log(err));
};

migrate();

module.exports = migrate;
