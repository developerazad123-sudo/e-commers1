# Deployment Guide for Akario Mart

This guide provides instructions for deploying the Akario Mart e-commerce application to a production environment.

## Application Structure

The application consists of two main parts:
- **Client**: React frontend built with Vite, located in the `client/` directory
- **Server**: Node.js/Express backend, located in the `server/` directory

## Prerequisites

Before deploying, ensure your production environment has:
- Node.js (v16 or higher)
- npm (v8 or higher)
- MongoDB (or access to a MongoDB Atlas cluster)

## Build Process

### 1. Install Dependencies
```bash
# From the root directory
npm install
cd server && npm install
cd ../client && npm install
```

### 2. Build the Frontend
```bash
# From the root directory
npm run build
# Or from the client directory
cd client && npm run build
```

This creates a production-ready build in the `client/dist/` directory.

## Environment Configuration

### Server Environment Variables (.env)
Create a `.env` file in the `server/` directory with the following variables:

```env
NODE_ENV=production
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30

MAX_FILE_UPLOAD=1000000

# Razorpay Keys (Production)
RAZORPAY_KEY_ID=your_production_razorpay_key_id
RAZORPAY_KEY_SECRET=your_production_razorpay_key_secret

# Twilio Credentials for OTP
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

### Client Environment Variables (.env)
Create a `.env` file in the `client/` directory with the following variables:

```env
VITE_REACT_APP_RAZORPAY_KEY_ID=your_production_razorpay_key_id
```

## Deployment Options

### Option 1: Deploy Client and Server Separately

#### Deploy Frontend
1. Build the client: `npm run build`
2. Upload the contents of the `client/dist/` directory to your static hosting provider (Netlify, Vercel, AWS S3, etc.)
3. Configure your domain to serve the static files

#### Deploy Backend
1. Upload the `server/` directory to your Node.js hosting provider (Heroku, DigitalOcean, AWS EC2, etc.)
2. Ensure environment variables are configured
3. Start the server with `npm start`

### Option 2: Deploy Server with Built Client

For simplicity, you can serve the frontend from the backend server:

1. After building the frontend, copy the contents of `client/dist/` to `server/public/`
2. Update `server/server.js` to serve static files from the public directory:

```javascript
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html for all routes (for React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
```

3. Deploy the entire server directory to your hosting provider

## Production Scripts

The root `package.json` includes the following deployment scripts:

- `npm run build`: Builds the frontend application
- `npm run build:frontend`: Alias for building the frontend
- `npm run deploy`: Runs the build process and prepares for deployment

## Post-Deployment Steps

1. Verify that the application is running correctly
2. Test all major functionality including:
   - User registration/login
   - Product browsing
   - Shopping cart functionality
   - Payment processing
   - Seller dashboard
3. Confirm that all environment variables are properly set
4. Check that the database connection is working
5. Verify that image uploads are functioning

## Troubleshooting

### Common Issues:

1. **Environment Variables Not Set**: Ensure all required environment variables are configured in production
2. **Database Connection Issues**: Verify the MongoDB URI is correct and accessible
3. **Static Files Not Loading**: Check that the frontend build files are properly deployed
4. **CORS Issues**: Ensure CORS settings in production allow your domain

### Logging:
Check server logs for any errors during startup or runtime.

## Rollback Procedure

To rollback to a previous version:
1. Stop the current application
2. Restore the previous version of the code
3. Restart the application
4. Verify functionality

## Security Considerations

- Never commit sensitive environment variables to version control
- Use strong, unique values for JWT secrets
- Ensure HTTPS is enabled in production
- Regularly update dependencies to patch security vulnerabilities
- Implement rate limiting to prevent abuse