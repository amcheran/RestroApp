const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  });  

db.connect((err) => {
  if (err) {
    console.error('MySQL connection failed: ', err.message);
    return;
  }
  console.log('✅ MySQL connected successfully.');
});

module.exports = db;
