import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { productAPI } from '../services/api';
import { Header } from '../components/homepage/Header';
import { CategoryNav } from '../components/homepage/CategoryNav';
import { BannerCarousel } from '../components/homepage/BannerCarousel';
import { ProductCard } from '../components/homepage/ProductCard';
import { DealsSection } from '../components/homepage/DealsSection';

const NewHome = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getProducts();
      
      if (response.success) {
        // Take first 8 products for display
        const featuredProducts = response.data.slice(0, 8).map(product => {
          // Check if image is an external URL (Unsplash, etc.)
          const isExternalUrl = product.image && (
            product.image.startsWith('http://') || 
            product.image.startsWith('https://')
          );
          
          // For local images, use the correct path
          // For external images, use as is
          let imageUrl;
          if (isExternalUrl) {
            imageUrl = product.image;
          } else if (product.image && product.image !== 'no-photo.jpg' && product.image !== '/uploads/no-photo.jpg') {
            // For uploaded images, construct the full URL
            if (product.image.startsWith('/uploads/')) {
              imageUrl = `http://localhost:5000${product.image}`;
            } else {
              // Add /uploads/ prefix for relative paths
              imageUrl = `http://localhost:5000/uploads/${product.image}`;
            }
          } else {
            imageUrl = 'http://localhost:5000/uploads/no-photo.jpg';
          }
              
          // Return the complete product object with updated image
          return {
            ...product,
            _id: product._id || product.id,
            id: product._id || product.id,
            image: imageUrl,
            title: product.name,
            price: product.discount 
              ? product.price * (1 - product.discount / 100)
              : product.price,
            originalPrice: product.price,
            rating: 4.5, // Default rating
            reviews: Math.floor(Math.random() * 1000) + 1 // Random reviews
          };
        });
        setProducts(featuredProducts);
      } else {
        setError('Failed to fetch products');
      }
    } catch (err) {
      setError('An error occurred while fetching products');
    } finally {
      setLoading(false);
    }
  };

  const getDefaultImage = (product) => {
    if (!product) return 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&h=300';
    
    const name = product.name?.toLowerCase() || '';
    const category = product.category?.toLowerCase() || '';
    
    // Technology products
    if (category.includes('technology') || category.includes('tech')) {
      if (name.includes('iphone') || name.includes('phone') || name.includes('mobile')) {
        return 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&h=300';
      } else if (name.includes('macbook') || name.includes('laptop') || name.includes('computer')) {
        return 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=400&h=300';
      } else if (name.includes('headphone') || name.includes('earbud')) {
        return 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&h=300';
      } else {
        return 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&h=300';
      }
    }
    
    // Clothing products
    if (category.includes('clothing') || category.includes('fashion')) {
      if (name.includes('shirt') || name.includes('t-shirt')) {
        return 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&h=300';
      } else if (name.includes('shoe') || name.includes('sneaker')) {
        return 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&h=300';
      } else {
        return 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=400&h=300';
      }
    }
    
    // Home appliances
    if (category.includes('home') || category.includes('appliance')) {
      return 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=400&h=300';
    }
    
    // Default image
    return 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&h=300';
  };

  const deals = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1631011714977-a6068c048b7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9iaWxlfGVufDF8fHx8MTc2MDY4MTUyOXww&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Smartphones",
      discount: "Up to 40% Off",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1511385348-a52b4a160dc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3NjA3Nzg5MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Laptops",
      discount: "Min 30% Off",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1558756520-22cfe5d382ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmVzJTIwYXVkaW98ZW58MXx8fHwxNzYwNjk5Mjc4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Headphones",
      discount: "From ₹499",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY2xvdGhpbmd8ZW58MXx8fHwxNzYwNzk4NDE2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Fashion",
      discount: "50-80% Off",
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwYXBwbGlhbmNlc3xlbnwxfHx8fDE3NjA3MzIxMDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Home Appliances",
      discount: "Up to 60% Off",
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1717295248494-937c3a5655b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljcyUyMGdhZGdldHN8ZW58MXx8fHwxNzYwNzMxMzc0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Electronics",
      discount: "Great Savings!",
    },
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div 
          className="text-xl text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div 
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CategoryNav />
      
      <main>
        {/* Banner Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <BannerCarousel />
        </motion.div>

        {/* Content Container */}
        <div className="container mx-auto px-4 py-6 space-y-6">
          {/* Deals Section */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={container}
          >
            <DealsSection title="Top Deals on Electronics" deals={deals} />
          </motion.div>

          {/* Products Section */}
          <motion.div 
            className="bg-white rounded-sm p-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Best of Electronics</h2>
              <Link 
                to="/products" 
                className="text-blue-600 font-medium hover:text-blue-800 transition-colors duration-300"
              >
                View All
              </Link>
            </div>
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  variants={item}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <ProductCard key={product.id} {...product} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Footer Banner */}
          <motion.div 
            className="bg-[#172337] text-white rounded-sm p-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-white text-2xl font-bold mb-2">Shop for Everything You Need</h2>
            <p className="text-gray-300 mb-6">
              Electronics, Fashion, Home & Kitchen, and more - All at amazing prices!
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-8">
              <div>
                <p className="text-gray-400">100% Secure Payments</p>
              </div>
              <div>
                <p className="text-gray-400">Easy Returns & Refunds</p>
              </div>
              <div>
                <p className="text-gray-400">Free Delivery</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default NewHome;