const express = require('express');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

console.log('Environment variables loaded');
console.log('PORT:', process.env.PORT);
console.log('MONGO_URI:', process.env.MONGO_URI);

// Initialize app
const app = express();

console.log('Express app initialized');

const PORT = process.env.PORT || 5000;

console.log(`Attempting to start server on port ${PORT}...`);

try {
  const server = app.listen(PORT, () => {
    console.log(`✅ Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    
    // Close server after 5 seconds for testing
    setTimeout(() => {
      console.log('Closing server for test...');
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    }, 5000);
  });
} catch (error) {
  console.error('❌ Failed to start server:', error.message);
  process.exit(1);
}