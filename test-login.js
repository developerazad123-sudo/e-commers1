const axios = require('axios');

const baseURL = 'http://localhost:5000/api';

// Test login function
async function testLogin(email, password, role) {
  try {
    console.log(`Testing login for ${email} as ${role}...`);
    const response = await axios.post(`${baseURL}/auth/login`, {
      email,
      password,
      role
    });
    
    console.log('Login SUCCESS:');
    console.log('- Token:', response.data.token);
    console.log('- User:', response.data.data.name, `(${response.data.data.email})`);
    console.log('- Role:', response.data.data.role);
    
    return response.data.token;
  } catch (error) {
    console.error('Login FAILED:');
    if (error.response) {
      console.error('- Status:', error.response.status);
      console.error('- Error:', error.response.data.error);
    } else {
      console.error('- Network Error:', error.message);
    }
    return null;
  }
}

// Test different login scenarios
async function runLoginTests() {
  console.log('=== LOGIN TESTS ===\n');
  
  // Test 1: Valid user login
  await testLogin('test@example.com', 'password123', 'user');
  console.log('');
  
  // Test 2: Valid seller login
  await testLogin('seller@example.com', 'password123', 'seller');
  console.log('');
  
  // Test 3: Wrong password
  await testLogin('test@example.com', 'wrongpassword', 'user');
  console.log('');
  
  // Test 4: Wrong role
  await testLogin('test@example.com', 'password123', 'seller');
  console.log('');
  
  // Test 5: Missing role (this will cause 400 error)
  try {
    console.log('Testing login WITHOUT role (should fail with 400)...');
    const response = await axios.post(`${baseURL}/auth/login`, {
      email: 'test@example.com',
      password: 'password123'
      // Missing role field
    });
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.log('EXPECTED ERROR - Missing role field causes 400 status');
      console.log('- Error:', error.response.data.error);
    } else {
      console.error('Unexpected error:', error.message);
    }
  }
}

// Run the tests
runLoginTests();