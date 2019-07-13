/* eslint-disable no-console */
const herokuConfig = 'postgres://teqjchzuxpwxfv:d5b272d0b6d8fdd9c758ce2b6bde2c740b7dbf148a9501d91165c9d4b9826fb4@ec2-23-21-160-38.compute-1.amazonaws.com:5432/da0qeua1di6o1l';
// const herokuConfig = 'postgres://wbyrbswyskoddv:0d09f2703ab192a95ba1dd6c6483343b9929816435b73cf5dd3853fe8a186641@ec2-174-129-227-205.compute-1.amazonaws.com:5432/da9jjrbgtn9ihg';
const data = {
  host: '@ec2-23-21-160-38.compute-1.amazonaws.com',
  user: 'teqjchzuxpwxfv',
  database: 'da0qeua1di6o1l',
  password: 'd5b272d0b6d8fdd9c758ce2b6bde2c740b7dbf148a9501d91165c9d4b9826fb4',
  port: 5432,
};


// console.log(data);

module.exports = { herokuConfig, data };


// const data = {
//     db_name: 'da0qeua1di6o1l',
//     db_user: 'teqjchzuxpwxfv',
//     db_host: '@ec2-23-21-160-38.compute-1.amazonaws.com',
//     db_port: 5432,
//     db_password: 'd5b272d0b6d8fdd9c758ce2b6bde2c740b7dbf148a9501d91165c9d4b9826fb4',
// };
