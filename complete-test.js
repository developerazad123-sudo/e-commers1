const axios = require('axios');

const baseURL = 'http://localhost:5000/api';

// Test registration
async function testRegistration() {
  try {
    console.log('Testing Registration...');
    const response = await axios.post(`${baseURL}/auth/register`, {
      name: 'Test Seller',
      email: 'seller@example.com',
      password: 'password123',
      role: 'seller'  // Using seller role to test product creation
    });
    console.log('Registration Success:', response.data);
    return response.data.token;  // Return token for login test
  } catch (error) {
    console.error('Registration Error:', error.response ? error.response.data : error.message);
    return null;
  }
}

// Test login
async function testLogin() {
  try {
    console.log('\nTesting Login...');
    const response = await axios.post(`${baseURL}/auth/login`, {
      email: 'seller@example.com',
      password: 'password123',
      role: 'seller'  // Role is required for login as well
    });
    console.log('Login Success:', response.data);
    return response.data.token;
  } catch (error) {
    console.error('Login Error:', error.response ? error.response.data : error.message);
    return null;
  }
}

// Test getting current user (requires authentication)
async function testGetMe(token) {
  try {
    console.log('\nTesting Get Current User...');
    const response = await axios.get(`${baseURL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Get Me Success:', response.data);
  } catch (error) {
    console.error('Get Me Error:', error.response ? error.response.data : error.message);
  }
}

// Test creating a product (requires authentication)
async function testCreateProduct(token) {
  try {
    console.log('\nTesting Create Product...');
    const response = await axios.post(`${baseURL}/products`, {
      name: 'Test Product',
      description: 'This is a test product',
      price: 99.99,
      category: 'technology'
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Create Product Success:', response.data);
  } catch (error) {
    console.error('Create Product Error:', error.response ? error.response.data : error.message);
  }
}

// Test getting products
async function testGetProducts() {
  try {
    console.log('\nTesting Get Products...');
    const response = await axios.get(`${baseURL}/products`);
    console.log('Get Products Success:', response.data);
  } catch (error) {
    console.error('Get Products Error:', error.response ? error.response.data : error.message);
  }
}

// Run all tests
async function runAllTests() {
  console.log('Starting API Tests...\n');
  
  // Test registration
  const token = await testRegistration();
  
  // If registration failed, try login
  if (!token) {
    const loginToken = await testLogin();
    if (loginToken) {
      await testGetMe(loginToken);
      await testCreateProduct(loginToken);
    }
  } else {
    // If registration succeeded, use that token
    await testGetMe(token);
    await testCreateProduct(token);
  }
  
  // Test getting products (public endpoint)
  await testGetProducts();
  
  console.log('\nAll tests completed.');
}

// Run the tests
runAllTests();