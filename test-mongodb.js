const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });

// Test MongoDB connection
async function testMongoDB() {
  try {
    console.log('Testing MongoDB connection...');
    console.log('MONGO_URI:', process.env.MONGO_URI);
    
    // Attempt to connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
    });
    
    console.log('✅ Successfully connected to MongoDB');
    await mongoose.connection.close();
    return true;
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    return false;
  }
}

// Run the test
testMongoDB().then((connected) => {
  if (connected) {
    console.log('You can now start your servers safely');
  } else {
    console.log('Please check your MongoDB configuration in the .env file');
    console.log('Refer to MONGODB_ATLAS_SETUP.md for instructions on setting up MongoDB Atlas');
  }
  process.exit(connected ? 0 : 1);
});