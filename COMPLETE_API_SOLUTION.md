# COMPLETE API SOLUTION
## Fixed and Working Akario Mart Backend

I've identified and fixed all issues with your API. Here's the complete solution.

## Current Status
✅ **All APIs are working correctly!**

## Working Endpoints

### 1. Public Endpoints
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get specific product

### 2. Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info
- `GET /api/auth/logout` - Logout user

## Required Data Formats

### Registration (`POST /api/auth/register`)
```json
{
  "name": "Full Name",        // Required, 1-50 characters
  "email": "user@example.com", // Required, valid email format
  "password": "password123",   // Required, minimum 6 characters
  "role": "user"              // Optional (defaults to "user"), or "seller", "admin"
}
```

### Login (`POST /api/auth/login`)
```json
{
  "email": "user@example.com", // Required
  "password": "password123",   // Required
  "role": "user"              // Required, must match user's role
}
```

## Test Credentials

### Existing Users in Database:
1. **Regular User**:
   - Email: `test@example.com`
   - Password: `password123`
   - Role: `user`

2. **Seller**:
   - Email: `seller@example.com`
   - Password: `password123`
   - Role: `seller`

## Complete Working Examples

### 1. Register New User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "user"
  }'
```

### 2. Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123",
    "role": "user"
  }'
```

### 3. Get Current User (requires token)
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### 4. Get Products (public)
```bash
curl -X GET http://localhost:5000/api/products
```

## Common Issues & Solutions

### Issue 1: 400 Bad Request on Registration
**Cause**: Missing required fields
**Solution**: Include all required fields (name, email, password)

### Issue 2: 400 Bad Request on Login
**Cause**: Missing role field
**Solution**: Always include the role field that matches the user's registered role

### Issue 3: 401 Unauthorized
**Cause**: Wrong credentials or role mismatch
**Solution**: Verify email, password, and role are correct

## Test Script
Run `node api-debug.js` to test all endpoints automatically.

## Frontend Integration Example

```javascript
// Register user
async function registerUser() {
  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'user'  // Optional, defaults to 'user'
      })
    });
    
    const data = await response.json();
    if (response.ok) {
      console.log('Registration successful!', data);
    } else {
      console.error('Registration failed:', data.error);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
}

// Login user
async function loginUser() {
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'john@example.com',
        password: 'password123',
        role: 'user'  // REQUIRED for login
      })
    });
    
    const data = await response.json();
    if (response.ok) {
      // Save token for future requests
      localStorage.setItem('token', data.token);
      console.log('Login successful!', data);
    } else {
      console.error('Login failed:', data.error);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
}

// Make authenticated request
async function getMe() {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch('http://localhost:5000/api/auth/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    if (response.ok) {
      console.log('User data:', data);
    } else {
      console.error('Request failed:', data.error);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
}
```

## Verification Steps

1. Ensure server is running: `cd server && npm run dev`
2. Check for "MongoDB Connected: 127.0.0.1" in console
3. Test products endpoint: `curl http://localhost:5000/api/products`
4. Register a new user with all required fields
5. Login with the same credentials and role
6. Use the token for authenticated requests

## Need Help with Frontend?
The React frontend components are in the `/client` directory:
- Login: `/client/src/pages/auth/Login.jsx`
- Register: `/client/src/pages/auth/Register.jsx`
- Auth Context: `/client/src/contexts/AuthContext.jsx`

Your API is now fully functional and ready to use!