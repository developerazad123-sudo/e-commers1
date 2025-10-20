const mongoose = require('mongoose');
require('dotenv').config();

console.log('Environment variables loaded');
console.log('MONGO_URI:', process.env.MONGO_URI);

async function testConnection() {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('Connection string:', process.env.MONGO_URI);
    
    // Add connection options for better error handling
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });
    
    console.log('✅ MongoDB connected successfully!');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Close the connection
    await mongoose.connection.close();
    console.log('Connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ MongoDB connection failed:');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    process.exit(1);
  }
}

testConnection();