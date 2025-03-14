// src/config/db.js
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  max: 20, // Maximum number of connections in the pool
  idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
  connectionTimeoutMillis: 5000, // Timeout for acquiring a connection (5 seconds)
  allowExitOnIdle: true, // Allow the process to exit when idle
});

// Add event listeners for error handling and logging
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
});

async function testConnection() {
  let client;
  try {
    client = await pool.connect();
    console.log('Database connection successful!');
  } catch (err) {
    console.error('Error connecting to the database:', err);
  } finally {
    if (client) {
      client.release();
    }
  }
}

// Test the connection pool on startup
testConnection();

module.exports = pool;