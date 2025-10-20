const mongoose = require('mongoose');
require('dotenv').config({ path: './server/.env' });

// MongoDB connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// User and Product models
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  createdAt: Date
});

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  discount: Number,
  category: String,
  image: String,
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: Date
});

const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);

// Check database contents
async function checkDatabase() {
  await connectDB();
  
  try {
    // Check users
    console.log('\n=== USERS IN DATABASE ===');
    const users = await User.find({});
    users.forEach(user => {
      console.log(`- ${user.name} (${user.email}) - Role: ${user.role} - Created: ${user.createdAt}`);
    });
    
    // Check products
    console.log('\n=== PRODUCTS IN DATABASE ===');
    const products = await Product.find({}).populate('seller', 'name email');
    products.forEach(product => {
      console.log(`- ${product.name} - Price: $${product.price} - Category: ${product.category} - Seller: ${product.seller.name}`);
    });
    
    console.log(`\nTotal Users: ${users.length}`);
    console.log(`Total Products: ${products.length}`);
    
  } catch (error) {
    console.error('Database query error:', error);
  } finally {
    mongoose.connection.close();
    console.log('\nDatabase connection closed.');
  }
}

// Run the check
checkDatabase();