const axios = require('axios');

// Test the seller dashboard functionality
async function testSellerDashboard() {
  try {
    console.log('Testing seller dashboard functionality...');
    
    // First, let's get all products to see the data structure
    const productsResponse = await axios.get('http://localhost:5000/api/products');
    console.log('Products response:', productsResponse.data);
    
    // Check if products have proper seller information
    if (productsResponse.data.success && productsResponse.data.data.length > 0) {
      console.log('\nFirst product details:');
      console.log(JSON.stringify(productsResponse.data.data[0], null, 2));
      
      // Check seller data format
      const firstProduct = productsResponse.data.data[0];
      console.log('\nSeller data type:', typeof firstProduct.seller);
      console.log('Seller data:', firstProduct.seller);
    }
    
  } catch (error) {
    console.error('Error testing seller dashboard:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
  }
}

testSellerDashboard();