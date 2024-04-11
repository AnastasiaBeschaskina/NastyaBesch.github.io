const mysql = require("mysql2");
require("dotenv").config();

const jawsDbUrl = process.env.JAWSDB_MARIA_URL;

const con = mysql.createConnection(jawsDbUrl);

con.connect((err) => {
  if (err) {
    console.log("Error, Failed to connect to the database", err);
    return;
  }
  console.log("Connection Successful");
});

module.exports = con;
