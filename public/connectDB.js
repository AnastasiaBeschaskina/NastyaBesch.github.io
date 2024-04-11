const mysql = require("mysql2");
require("dotenv").config();

// Create a connection configuration object to connect to the MySQL database
const con = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  queueLimit: 0,
});

con.connect((err) => {
  if (err) {
    console.log("Error, Failed to connect to the database", err);
    return;
  }
  console.log("Connection Successful");
});

module.exports = con;
