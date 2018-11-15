var knex = require('knex');
var db = knex({
client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'admin',
    password : '123456',
    database : 'TESTE_VUEJS'
  }
});
module.exports = db;