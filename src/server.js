// src/server.js
const app = require('./app');
require('dotenv').config();
const http = require('http'); // Import http for server creation

const PORT = parseInt(process.env.PORT) || 5000; // Parse PORT as integer

// Validate PORT
if (isNaN(PORT)) {
  console.error('Error: Invalid PORT environment variable.');
  process.exit(1); // Exit with error code
}

const server = http.createServer(app); // Create HTTP server

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Handle server errors
server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});

// Graceful shutdown
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

async function gracefulShutdown() {
  console.log('Received shutdown signal. Closing server...');
  server.close(async (err) => {
    if (err) {
      console.error('Error closing server:', err);
    }
    console.log('Server closed.');
    try {
      // Close database connection pool
      const pool = require('./config/db');
      await pool.end();
      console.log('Database connection pool closed.');
    } catch (dbError) {
      console.error('Error closing database connection pool:', dbError);
    }
    process.exit(err ? 1 : 0);
  });
}