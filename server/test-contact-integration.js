const axios = require('axios');
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

// Test the complete contact integration flow
async function testContactIntegration() {
  try {
    console.log('Testing complete contact integration flow...');
    
    // 1. Login as a user to get a token
    console.log('Logging in as user...');
    const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'ra@gmail.com',
      password: '123456',
      role: 'user'
    });
    
    const token = loginResponse.data.token;
    const userId = loginResponse.data.data._id;
    console.log('User logged in successfully');
    
    // 2. Submit a contact message
    console.log('Submitting contact message...');
    const contactResponse = await axios.post('http://localhost:5000/api/contact', {
      name: 'ranjana',
      email: 'ra@gmail.com',
      subject: 'Test Integration Message',
      message: 'This is a test message to verify the integration'
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const messageId = contactResponse.data.data._id;
    console.log('Contact message submitted:', messageId);
    
    // 3. Verify the message is associated with the user in the database
    console.log('Verifying message association in database...');
    const contactInDb = await Contact.findById(messageId);
    console.log('Message in DB:', {
      id: contactInDb._id,
      user: contactInDb.user,
      name: contactInDb.name,
      subject: contactInDb.subject
    });
    
    if (contactInDb.user && contactInDb.user.toString() === userId) {
      console.log('✓ Message correctly associated with user');
    } else {
      console.log('✗ Message NOT associated with user');
    }
    
    // 4. Fetch user messages through the API
    console.log('Fetching user messages through API...');
    const userMessagesResponse = await axios.get('http://localhost:5000/api/contact/user', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('User messages API response:', {
      success: userMessagesResponse.data.success,
      count: userMessagesResponse.data.count,
      hasTestMessage: userMessagesResponse.data.data.some(msg => msg._id === messageId)
    });
    
    if (userMessagesResponse.data.success && userMessagesResponse.data.data.some(msg => msg._id === messageId)) {
      console.log('✓ Test message found in user messages');
    } else {
      console.log('✗ Test message NOT found in user messages');
    }
    
    // 5. Clean up - delete the test message
    console.log('Cleaning up test message...');
    await Contact.findByIdAndDelete(messageId);
    console.log('Test message cleaned up');
    
    console.log('\n=== Integration Test Complete ===');
    process.exit();
  } catch (err) {
    console.error('Error in integration test:', err.message);
    if (err.response) {
      console.error('Response data:', err.response.data);
      console.error('Response status:', err.response.status);
    }
    process.exit(1);
  }
}

testContactIntegration();