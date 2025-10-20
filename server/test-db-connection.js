const mongoose = require('mongoose');

console.log('Testing MongoDB connection...');

mongoose.connect('mongodb://127.0.0.1:27017/akariomart')
  .then(() => {
    console.log('Successfully connected to MongoDB');
    process.exit(0);
  })
  .catch(err => {
    console.log('Error connecting to MongoDB:', err.message);
    process.exit(1);
  });