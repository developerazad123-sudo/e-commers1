const mongoose = require('mongoose');
require('dotenv').config({ path: './server/.env' });

// MongoDB connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// User model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  createdAt: Date
});

const User = mongoose.model('User', userSchema);

// Check users in database
async function checkUsers() {
  await connectDB();
  
  try {
    console.log('=== USERS IN DATABASE ===');
    const users = await User.find({});
    if (users.length === 0) {
      console.log('No users found in database');
    } else {
      users.forEach((user, index) => {
        console.log(`${index + 1}. ${user.name} (${user.email}) - Role: ${user.role} - Created: ${user.createdAt}`);
      });
    }
    
    console.log(`\nTotal Users: ${users.length}`);
    
  } catch (error) {
    console.error('Database query error:', error);
  } finally {
    mongoose.connection.close();
    console.log('\nDatabase connection closed.');
  }
}

// Run the check
checkUsers();