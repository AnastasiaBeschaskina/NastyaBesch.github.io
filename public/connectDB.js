const mysql = require("mysql2");

const dbUrl =
  "mysql://qbuk825x4tzh2ajw:nw0b0vgajtg9rvc1@ao9moanwus0rjiex.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/bfl2k9dv3ddtrv6k";

  const con = mysql.createConnection(dbUrl);
  
// Create a connection configuration object to connect to the MySQL database
// const con = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT,
//   waitForConnections: true,
//   queueLimit: 0,
// });

con.connect((err) => {
  if (err) {
    console.log("Error, Failed to connect to the database", err);
    return;
  }
  console.log("Connection Successful");
});

module.exports = con;
