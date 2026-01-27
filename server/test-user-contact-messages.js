const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: '.env' });

// Load models
const Contact = require('./models/Contact');
const User = require('./models/User');

// Connect to database
const connectDB = require('./config/db');
connectDB();

// Test user contact messages
async function testUserContactMessages() {
  try {
    console.log('Testing user contact messages...');
    
    // Find a user
    const user = await User.findOne({ role: 'user' });
    if (!user) {
      console.log('No user found');
      process.exit(1);
    }
    
    console.log(`Found user: ${user.name} (${user.email})`);
    
    // Create a test contact message associated with the user
    const contact = await Contact.create({
      name: user.name,
      email: user.email,
      subject: 'Test Message',
      message: 'This is a test message from the user',
      user: user._id
    });
    
    console.log('Created contact message:', contact._id);
    
    // Verify the message was associated with the user
    const userMessages = await Contact.find({ user: user._id });
    console.log(`User has ${userMessages.length} messages`);
    
    // Clean up - delete the test message
    await Contact.findByIdAndDelete(contact._id);
    console.log('Cleaned up test message');
    
    process.exit();
  } catch (err) {
    console.error('Error testing user contact messages:', err);
    process.exit(1);
  }
}

testUserContactMessages();