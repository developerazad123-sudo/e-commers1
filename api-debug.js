const axios = require('axios');

const baseURL = 'http://localhost:5000/api';

// Function to test registration with detailed error reporting
async function debugRegistration(userData) {
  try {
    console.log(`\nTesting registration with data:`, userData);
    const response = await axios.post(`${baseURL}/auth/register`, userData);
    console.log('✅ SUCCESS:', response.data);
    return response.data;
  } catch (error) {
    console.log('❌ FAILED:');
    if (error.response) {
      console.log('  Status:', error.response.status);
      console.log('  Error:', error.response.data);
    } else {
      console.log('  Network Error:', error.message);
    }
    return null;
  }
}

// Function to test login with detailed error reporting
async function debugLogin(loginData) {
  try {
    console.log(`\nTesting login with data:`, loginData);
    const response = await axios.post(`${baseURL}/auth/login`, loginData);
    console.log('✅ SUCCESS:', response.data);
    return response.data;
  } catch (error) {
    console.log('❌ FAILED:');
    if (error.response) {
      console.log('  Status:', error.response.status);
      console.log('  Error:', error.response.data);
    } else {
      console.log('  Network Error:', error.message);
    }
    return null;
  }
}

// Function to test products endpoint
async function debugProducts() {
  try {
    console.log(`\nTesting products endpoint...`);
    const response = await axios.get(`${baseURL}/products`);
    console.log('✅ SUCCESS: Found', response.data.count, 'products');
    return response.data;
  } catch (error) {
    console.log('❌ FAILED:');
    if (error.response) {
      console.log('  Status:', error.response.status);
      console.log('  Error:', error.response.data);
    } else {
      console.log('  Network Error:', error.message);
    }
    return null;
  }
}

// Run comprehensive tests
async function runDebugTests() {
  console.log('=== API DEBUG TESTS ===');
  
  // Test 1: Products endpoint (should work)
  await debugProducts();
  
  // Test 2: Registration with missing fields
  console.log('\n--- Testing Registration Issues ---');
  await debugRegistration({}); // Empty object
  await debugRegistration({ name: 'Test' }); // Missing email, password, role
  await debugRegistration({ name: 'Test', email: 'test@example.com' }); // Missing password, role
  await debugRegistration({ name: 'Test', email: 'test@example.com', password: '123' }); // Password too short
  await debugRegistration({ name: 'Test', email: 'invalid-email', password: 'password123', role: 'user' }); // Invalid email
  
  // Test 3: Correct registration
  console.log('\n--- Testing Correct Registration ---');
  const timestamp = Date.now();
  const testEmail = `user${timestamp}@example.com`;
  const registrationData = {
    name: `Test User ${timestamp}`,
    email: testEmail,
    password: 'password123',
    role: 'user'
  };
  
  const registrationResult = await debugRegistration(registrationData);
  
  // Test 4: Login with the newly registered user
  if (registrationResult) {
    console.log('\n--- Testing Login with New User ---');
    const loginData = {
      email: testEmail,
      password: 'password123',
      role: 'user'
    };
    await debugLogin(loginData);
  }
  
  // Test 5: Login with existing users
  console.log('\n--- Testing Login with Existing Users ---');
  await debugLogin({
    email: 'test@example.com',
    password: 'password123',
    role: 'user'
  });
  
  console.log('\n=== DEBUG TESTS COMPLETE ===');
}

// Run the tests
runDebugTests();