/* eslint-disable no-console */
const db = require('../../connect');
const seedQueries = require('./seedQueries');


const seed = async () => {
  const res = await db.query(seedQueries)
    .then((result) => {
      console.log(result.rows);
      console.log('Tables seeded');
    })
    .catch(err => console.log(err));

  return res;
};


seed();

module.exports = seed;
