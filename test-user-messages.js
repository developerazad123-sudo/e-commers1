// Simple test script to verify user messages are fetched correctly
// Using built-in fetch (Node.js 18+)

async function testUserMessages() {
  try {
    // First, login to get a valid token
    const loginResponse = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 's@gmail.com',
        password: '123456',
        role: 'user'
      })
    });

    const loginData = await loginResponse.json();
    console.log('Login response:', loginData);

    if (!loginData.success) {
      console.log('Login failed');
      return;
    }

    const token = loginData.token;
    console.log('Token:', token);

    // Create a new contact message
    const createMessageResponse = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 's@gmail.com',
        subject: 'Test Message',
        message: 'This is a test message from the user'
      })
    });

    const createMessageData = await createMessageResponse.json();
    console.log('Create message response:', JSON.stringify(createMessageData, null, 2));

    // Now fetch user messages
    const messagesResponse = await fetch('http://localhost:5000/api/contact/user', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const messagesData = await messagesResponse.json();
    console.log('Messages response:', JSON.stringify(messagesData, null, 2));
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testUserMessages();