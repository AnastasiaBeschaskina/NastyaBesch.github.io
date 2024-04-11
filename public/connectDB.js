const mysql = require("mysql2");
require("dotenv").config();

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

con.connect((err) => {
  if (err) {
    console.log("Error, Failed to connect to the database", err);
    return;
  }
  console.log("Connection Successful");
});

module.exports = con;
