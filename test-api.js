const axios = require('axios');

// Test registration
async function testRegistration() {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/register', {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'user'
    });
    console.log('Registration Response:', response.data);
  } catch (error) {
    console.error('Registration Error:', error.response ? error.response.data : error.message);
  }
}

// Test login
async function testLogin() {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'test@example.com',
      password: 'password123',
      role: 'user'
    });
    console.log('Login Response:', response.data);
  } catch (error) {
    console.error('Login Error:', error.response ? error.response.data : error.message);
  }
}

// Run tests
testRegistration().then(() => {
  setTimeout(testLogin, 1000); // Wait a bit before login
});