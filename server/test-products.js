const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

// Load env vars
dotenv.config();

// Connect to database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Remove deprecated options
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

const testProducts = async () => {
  await connectDB();
  
  try {
    const products = await Product.find();
    console.log(`Found ${products.length} products in database:`);
    console.log(products);
  } catch (err) {
    console.error('Error fetching products:', err);
  } finally {
    mongoose.connection.close();
  }
};

testProducts();