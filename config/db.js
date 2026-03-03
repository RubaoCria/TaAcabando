const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "971662",
  database: "barbearia",
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = db;