var mysql = require('mysql')

var state = {
  pool: null
}

exports.connect = function(done) {
  state.pool = mysql.createPool({
    host: 'localhost',
    user: 'todo_user',
    password: 'password',
    database: 'todo_db'
  });
  done()
}

exports.get = function() {
  return state.pool
}
