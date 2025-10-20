# Akario Mart - Backend Connection Guide

This guide explains how to properly connect the frontend to the backend and ensure data flows correctly between them.

## Backend Setup

### 1. Environment Configuration
Ensure your [.env](file://c:/Users/acer/OneDrive/Documents/AKARIO%20MART/server/.env) file in the `server` directory has the correct configuration:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/akariomart
JWT_SECRET=akariomartsecretkey
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30
FILE_UPLOAD_PATH=./public/uploads
MAX_FILE_UPLOAD=1000000
```

### 2. Starting the Backend Server
Navigate to the server directory and start the development server:

```bash
cd server
npm run dev
```

You should see output similar to:
```
Server running in development mode on port 5000
MongoDB Connected: 127.0.0.1
```

## API Endpoints

### Authentication

#### Register User
- **Endpoint**: `POST /api/auth/register`
- **Required Fields**: `name`, `email`, `password`, `role`
- **Role Options**: `user`, `seller`, `admin`

#### Login User
- **Endpoint**: `POST /api/auth/login`
- **Required Fields**: `email`, `password`, `role`
- **Note**: Role must match the user's registered role

#### Get Current User
- **Endpoint**: `GET /api/auth/me`
- **Authentication**: Requires JWT token in Authorization header

### Products

#### Get All Products
- **Endpoint**: `GET /api/products`
- **Authentication**: Not required (public endpoint)

#### Create Product
- **Endpoint**: `POST /api/products`
- **Authentication**: Required (seller or admin role)
- **Required Fields**: `name`, `description`, `price`, `category`

## Frontend Integration

### 1. Making API Requests

#### Register User
```javascript
const response = await fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'user'
  })
});
```

#### Login User
```javascript
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'password123',
    role: 'user'
  })
});

const data = await response.json();
const token = data.token; // Store this token for authenticated requests
```

#### Authenticated Requests
```javascript
const response = await fetch('http://localhost:5000/api/auth/me', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}` // Include the token from login
  }
});
```

### 2. Handling Responses

Always check the response status and handle errors appropriately:

```javascript
if (response.ok) {
  const data = await response.json();
  // Handle successful response
} else {
  const error = await response.json();
  // Handle error response
}
```

## Data Flow Verification

### 1. MongoDB Compass
- Open MongoDB Compass
- Connect to `mongodb://localhost:27017`
- Select the `akariomart` database
- View collections: `users` and `products`

### 2. Console Logging
The backend server logs all requests in the console:
```
POST /api/auth/register 201 221.213 ms - 302
GET /api/products 200 15.463 ms - 36
```

## Common Issues and Solutions

### 1. Connection Refused Errors
- Ensure MongoDB service is running
- Check that the server is running on port 5000
- Verify the MONGO_URI in [.env](file://c:/Users/acer/OneDrive/Documents/AKARIO%20MART/server/.env) uses `127.0.0.1` instead of `localhost`

### 2. 400 Bad Request Errors
- Ensure all required fields are provided
- Check that the role matches between registration and login
- Verify email format is correct

### 3. 401 Unauthorized Errors
- Ensure you're including the JWT token in authenticated requests
- Check that the token is valid and not expired

### 4. 403 Forbidden Errors
- Verify the user has the correct role for the requested action
- Only sellers and admins can create products

## Testing the Connection

You can test the connection using:
1. The provided `complete-test.js` script
2. The `frontend-test.html` file
3. Tools like Postman or curl
4. Direct browser access to endpoints

## Example Test Workflow

1. Register a new seller account
2. Login with the seller account
3. Create a new product
4. Verify the product appears in the products list
5. Check MongoDB Compass to confirm data storage
6. Check server console for request logs

This completes the full cycle of frontend-backend-database connection.