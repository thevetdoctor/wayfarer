/* eslint-disable no-unused-vars */
// import regenerator from 'regenerator-runtime';
const drop = require('./dropTables');
const create = require('./createTables');
const seed = require('./seedTables');


const migrate = async () => {
  // const dropTables = await drop();
  // const createTables = await create();
  // const seedTables = await seed();
};

migrate();

module.exports = migrate;
