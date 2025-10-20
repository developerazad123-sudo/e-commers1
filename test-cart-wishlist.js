// Test script to verify cart and wishlist functionality
const testCartWishlist = async () => {
  console.log('Testing Cart and Wishlist functionality...\n');
  
  try {
    const productsResponse = await fetch('http://localhost:5000/api/products');
    const productsData = await productsResponse.json();
    
    if (productsData.success && productsData.data.length > 0) {
      
      // Test adding first product to cart
      const firstProduct = productsData.data[0];
      

      
    } else {
    }
  } catch (error) {
    console.error('❌ Error testing cart/wishlist:', error.message);
  }
};

// Run the test
testCartWishlist();