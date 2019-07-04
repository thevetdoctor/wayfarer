/* eslint-disable no-console */
// import regenerator from 'regenerator-runtime';
const db = require('../../connect');
const allTables = require('./tables');


const create = async () => {
  const res = await db.query(allTables)
    .then((result) => {
      console.log(result.rows);
      console.log('Tables created');
    })
    .catch(err => console.log(err));

  return res;
};


create();

module.exports = create;
