/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const db = require('../connect');
const dropQuery = require('./dropQuery');
const createQuery = require('./tableQuery');
const seedQuery = require('./seedQuery');


const migrate = async () => {
  // drop tables
  const drop = await db.query(dropQuery)
    .then(result => console.log('Tables dropped'))
    .catch(err => console.log(err));

  // create tables
  const create = await db.query(createQuery)
    .then(result => console.log('Tables created'))
    .catch(err => console.log(err));

  // seed tables
  const seed = await db.query(seedQuery)
    .then(result => console.log('Tables seeded'))
    .catch(err => console.log(err));
};

migrate();

module.exports = migrate;
