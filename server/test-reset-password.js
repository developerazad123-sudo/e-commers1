const axios = require('axios');

async function testResetPassword() {
  try {
    // Use the reset token from the previous test
    const resetToken = '4b0fda40c901eb72679008996e412cd1f14a2ae0';
    
    const response = await axios.put(`http://localhost:5000/api/auth/resetpassword/${resetToken}`, {
      password: 'newpassword123'
    });
    
    console.log('Reset Password Response:', response.data);
  } catch (error) {
    console.error('Reset Password Error:', error.response ? error.response.data : error.message);
  }
}

testResetPassword();