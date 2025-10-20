const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Initialize app
const app = express();

// Middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: '*',
}));



// Serve static files from 'uploads' folder with proper CORS headers
// app.use(
//   '/uploads',
//   (req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:5173/*');
//     res.header('Access-Control-Allow-Methods', '*');
//     res.header('Access-Control-Allow-Headers', '*');
//     next();
//   },
//   express.static(path.join(__dirname, 'public', 'uploads'))
// );


app.use(
  '/uploads',
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  }),
  (req, res, next) => {
    res.set('Cross-Origin-Resource-Policy', 'cross-origin'); //  important for Chrome
    res.set('Cache-Control', 'no-store'); // prevent 304 cache issues
    next();
  },
  express.static(path.join(__dirname, 'public', 'uploads'))
);


// Serve static files from the public directory (uploads folder)
// app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// Mount routers
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/products', require('./routes/products'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/payment', require('./routes/payment'));
app.use('/api/seller/contact', require('./routes/sellerContact'));

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => {
    process.exit(1);
  });
});

