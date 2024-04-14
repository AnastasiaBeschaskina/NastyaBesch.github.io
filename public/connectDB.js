const mysql = require("mysql");
require("dotenv").config();

const url = require("url");

const dbUrl = new URL(process.env.JAWSDB_MARIA_URL);
const con = mysql.createConnection({
  host: dbUrl.hostname,
  user: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.replace(/^\//, ""), // Remove leading slash from database path
  port: dbUrl.port,
});

con.connect((err) => {
  if (err) {
    console.log("Error, Failed to connect to the database", err);
    return;
  }
  console.log("Connection Successful");
});

module.exports = con;
