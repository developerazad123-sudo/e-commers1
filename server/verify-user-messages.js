const axios = require('axios');

// Test to verify user messages appear in "My Messages" section
async function verifyUserMessages() {
  try {
    console.log('Verifying user messages in "My Messages" section...');
    
    // 1. Login as a user to get a token
    console.log('Logging in as user...');
    const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'ra@gmail.com',
      password: '123456',
      role: 'user'
    });
    
    const token = loginResponse.data.token;
    console.log('User logged in successfully');
    
    // 2. Fetch user messages through the API
    console.log('Fetching user messages through API...');
    const userMessagesResponse = await axios.get('http://localhost:5000/api/contact/user', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('User messages API response:', {
      success: userMessagesResponse.data.success,
      count: userMessagesResponse.data.count
    });
    
    if (userMessagesResponse.data.success && userMessagesResponse.data.count > 0) {
      console.log('✓ User messages found in API response');
      console.log('Sample messages:');
      userMessagesResponse.data.data.slice(0, 3).forEach((msg, index) => {
        console.log(`  ${index + 1}. ${msg.subject} (${msg.createdAt})`);
      });
    } else {
      console.log('✗ No user messages found');
    }
    
    console.log('\n=== Verification Complete ===');
  } catch (err) {
    console.error('Error verifying user messages:', err.message);
    if (err.response) {
      console.error('Response data:', err.response.data);
      console.error('Response status:', err.response.status);
    }
  }
}

verifyUserMessages();