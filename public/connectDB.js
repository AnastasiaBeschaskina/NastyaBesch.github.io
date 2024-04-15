const mysql = require("mysql");
require("dotenv").config();

const dbUrl = new URL(process.env.JAWSDB_MARIA_URL);

const poolConfig = {
  host: dbUrl.hostname,
  user: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.slice(1),
  port: dbUrl.port,
};

const pool = mysql.createPool(poolConfig);

const query = (sql, params) =>
  new Promise((resolve, reject) => {
    pool.query(sql, params, (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });

// Export both pool and query
module.exports = query;
