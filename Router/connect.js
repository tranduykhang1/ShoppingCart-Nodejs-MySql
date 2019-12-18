const mysql = require('mysql');


var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '',
    database: 'original_coffee'
});

conn.connect();
module.exports = conn;