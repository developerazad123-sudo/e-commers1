// Test script to verify frontend fixes
const testFrontendFix = async () => {
  console.log('Testing frontend fixes...\n');
  
  // Test registration
  try {
    console.log('1. Testing registration...');
    const registerResponse = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Frontend Test User',
        email: `frontend${Date.now()}@test.com`,
        password: 'password123',
        role: 'user'
      })
    });
    
    const registerData = await registerResponse.json();
    console.log('Registration response:', registerData);
    
    if (registerResponse.ok) {
      console.log('✅ Registration successful!\n');
    } else {
      console.log('❌ Registration failed\n');
    }
  } catch (error) {
    console.log('Registration error:', error.message, '\n');
  }
  
  // Test login
  try {
    console.log('2. Testing login...');
    const loginResponse = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123',
        role: 'user'
      })
    });
    
    const loginData = await loginResponse.json();
    console.log('Login response:', loginData);
    
    if (loginResponse.ok) {
      console.log('✅ Login successful!\n');
    } else {
      console.log('❌ Login failed\n');
    }
  } catch (error) {
    console.log('Login error:', error.message, '\n');
  }
  
  console.log('Frontend fix test completed!');
};

// Run the test
testFrontendFix();