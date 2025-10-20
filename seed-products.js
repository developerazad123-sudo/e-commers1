// Script to seed products with different prices and images
const axios = require('axios');

const baseURL = 'http://localhost:5000/api';
let token = '';

// Login as seller to create products
async function loginAsSeller() {
  try {
    const response = await axios.post(`${baseURL}/auth/login`, {
      email: 'seller@example.com',
      password: 'password123',
      role: 'seller'
    });
    
    token = response.data.token;
    console.log('Logged in as seller');
    return true;
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    return false;
  }
}

// Create sample products with different prices and categories
async function createSampleProducts() {
  const products = [
    {
      name: 'iPhone 15 Pro',
      description: 'Latest Apple smartphone with advanced camera system',
      price: 129999,
      discount: 5,
      category: 'technology',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&h=300'
    },
    {
      name: 'Men\'s Casual Shirt',
      description: 'Comfortable cotton shirt for everyday wear',
      price: 1299,
      discount: 15,
      category: 'clothing',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&h=300'
    },
    {
      name: 'Samsung 55" 4K Smart TV',
      description: 'Crystal clear 4K resolution with smart features',
      price: 64999,
      discount: 10,
      category: 'home appliances',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&h=300'
    },
    {
      name: 'Nike Air Max Shoes',
      description: 'Comfortable running shoes with air cushioning',
      price: 8999,
      discount: 20,
      category: 'clothing',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&h=300'
    },
    {
      name: 'MacBook Pro 16"',
      description: 'Powerful laptop for professionals',
      price: 239999,
      discount: 0,
      category: 'technology',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=400&h=300'
    },
    {
      name: 'Whirlpool Washing Machine',
      description: 'Fully automatic front load washing machine',
      price: 28999,
      discount: 12,
      category: 'home appliances',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&h=300'
    },
    {
      name: 'Women\'s Summer Dress',
      description: 'Lightweight cotton dress for summer',
      price: 1599,
      discount: 25,
      category: 'clothing',
      image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=400&h=300'
    },
    {
      name: 'Sony Wireless Headphones',
      description: 'Noise cancelling wireless headphones',
      price: 18999,
      discount: 8,
      category: 'technology',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&h=300'
    }
  ];

  for (const product of products) {
    try {
      const response = await axios.post(`${baseURL}/products`, product, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data.success) {
        console.log(`Created product: ${product.name} - ₹${product.price}`);
      } else {
        console.error(`Failed to create ${product.name}:`, response.data.error);
      }
    } catch (error) {
      console.error(`Error creating ${product.name}:`, error.response?.data || error.message);
    }
  }
}

// Run the seeding process
async function seedProducts() {
  console.log('Seeding products with Indian Rupee prices and images...');
  
  const loggedIn = await loginAsSeller();
  if (!loggedIn) {
    console.log('Failed to login as seller. Exiting.');
    return;
  }
  
  await createSampleProducts();
  console.log('Product seeding completed!');
}

// Execute if run directly
if (require.main === module) {
  seedProducts();
}

module.exports = { seedProducts };