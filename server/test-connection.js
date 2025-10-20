const mongoose = require('mongoose');

async function testConnection() {
  try {
    console.log('Testing MongoDB connection to: mongodb://127.0.0.1:27017/akariomart');
    await mongoose.connect('mongodb://127.0.0.1:27017/akariomart');
    console.log('✅ MongoDB connected successfully!');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

testConnection();