# Login Issue Fix Guide

## Problem
You're getting a 400 error when trying to login:
```
POST /api/auth/login 400 13.613 ms - 68
```

## Root Cause
The login endpoint requires **three fields** in the request body:
1. `email`
2. `password`
3. `role`

If any of these fields are missing, the server returns a 400 error with the message:
> "Please provide email, password, and role"

## Solution

### 1. Ensure All Required Fields Are Sent
When making a login request, make sure to include all three fields:

```json
{
  "email": "test@example.com",
  "password": "password123",
  "role": "user"
}
```

### 2. Example Frontend Code Fix

#### JavaScript/Fetch API:
```javascript
// CORRECT - Includes all required fields
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'test@example.com',
    password: 'password123',
    role: 'user'  // This field is REQUIRED
  })
});
```

#### Incorrect Example (Missing Role):
```javascript
// INCORRECT - Missing role field will cause 400 error
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'test@example.com',
    password: 'password123'
    // role field is missing - this causes the 400 error
  })
});
```

### 3. Available Test Users
Here are the existing users in your database that you can use for testing:

1. **User Account**:
   - Email: `test@example.com`
   - Password: `password123`
   - Role: `user`

2. **Seller Account**:
   - Email: `seller@example.com`
   - Password: `password123`
   - Role: `seller`

### 4. Test with Provided Files
1. Open `login-test.html` in your browser
2. Enter the credentials for one of the test users
3. Make sure to select the correct role from the dropdown
4. Click "Login"

### 5. Common Mistakes to Avoid
1. **Missing role field** - Always include the role
2. **Wrong role** - Make sure the role matches the user's registered role
3. **Wrong credentials** - Double-check email and password
4. **Network issues** - Ensure the backend server is running on port 5000

## Verification
After implementing the fix, you should see a successful response like:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "id": "68f3a7dc215b0032a0ec5790",
    "name": "Test User",
    "email": "test@example.com",
    "role": "user"
  }
}
```

## Need More Help?
1. Check that the server is running: `cd server && npm run dev`
2. Verify MongoDB is connected: Look for "MongoDB Connected: 127.0.0.1" in the console
3. Use `test-login.js` to run automated tests
4. Check `check-users.js` to see all available users in the database