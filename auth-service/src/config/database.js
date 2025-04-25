// auth-service/src/config/database.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'root',
  host: '110.238.74.141',
  database: 'bookms',
  password: '#qwerty123',
  port: 5432,
});

const connectDB = async () => {
  try {
    await pool.connect();
    console.log('Connected to the bookstore_auth database');
  } catch (err) {
    console.error('Failed to connect to the bookstore_auth database', err);
    process.exit(1);
  }
};

module.exports = { pool, connectDB };



