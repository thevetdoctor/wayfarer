export default {
  //   user queries
  createUserQuery: 'INSERT INTO users (email, first_name, last_name, password) VALUES($1, $2, $3, $4) RETURNING *',
  findUserQuery: 'SELECT * FROM users WHERE email = $1',
  getUserQuery: 'SELECT * FROM users ORDER BY id DESC',

};
