import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import { productAPI, sellerContactAPI } from '../../services/api'

const SellerDashboard = () => {
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [showEditProduct, setShowEditProduct] = useState(false)
  const [showContactQueries, setShowContactQueries] = useState(false)
  const [showResponseModal, setShowResponseModal] = useState(false)
  const [selectedContact, setSelectedContact] = useState(null)
  const [responseMessage, setResponseMessage] = useState('')
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    discount: '',
    category: 'technology',
    imageUrl: ''
  })
  const [editingProduct, setEditingProduct] = useState(null)
  const [image, setImage] = useState(null)
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [products, setProducts] = useState([])
  const [productsLoading, setProductsLoading] = useState(true)
  const [productsError, setProductsError] = useState('')
  const [contactQueries, setContactQueries] = useState([])
  const [contactResponses, setContactResponses] = useState([])
  const [contactLoading, setContactLoading] = useState(false)
  const [responseLoading, setResponseLoading] = useState(false)
  const navigate = useNavigate()
  const { user } = useAuth()

  // Fetch seller's products
  useEffect(() => {
    if (user && user.id) {
      fetchSellerProducts()
    }
  }, [user])

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (showAddProduct || showEditProduct || showContactQueries || showResponseModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showAddProduct, showEditProduct, showContactQueries, showResponseModal]);

  const fetchSellerProducts = async () => {
    // Don't fetch if user is not available
    if (!user || !user.id) {
      setProductsLoading(false)
      return
    }
    
    try {
      setProductsLoading(true)
      setProductsError('')
      
      const token = localStorage.getItem('token')
      const response = await productAPI.getProducts()
      
      if (response.success) {
        // Filter products to show only those belonging to the current seller
        const sellerProducts = response.data.filter(product => {
          // Handle both string and object formats for seller
          const sellerId = typeof product.seller === 'object' ? product.seller._id : product.seller
          return sellerId === user.id
        })
        setProducts(sellerProducts)
      } else {
        setProductsError('Failed to fetch products')
      }
    } catch (err) {
      setProductsError('An error occurred while fetching products')
      console.error(err)
    } finally {
      setProductsLoading(false)
    }
  }

  // Fetch contact queries
  const fetchContactQueries = async () => {
    try {
      setContactLoading(true)
      const token = localStorage.getItem('token')
      const response = await sellerContactAPI.getContactMessages(token)
      
      if (response.success) {
        setContactQueries(response.data)
      } else {
        setError('Failed to fetch contact queries')
      }
    } catch (err) {
      setError('An error occurred while fetching contact queries')
      console.error(err)
    } finally {
      setContactLoading(false)
    }
  }

  // Send response to contact query
  const sendContactResponse = async (e) => {
    e.preventDefault()
    try {
      setResponseLoading(true)
      const token = localStorage.getItem('token')
      const response = await sellerContactAPI.sendContactResponse(
        selectedContact._id,
        responseMessage,
        token
      )
      
      if (response.success) {
        setSuccess('Response sent successfully!')
        setResponseMessage('')
        setShowResponseModal(false)
        // Refresh contact queries
        fetchContactQueries()
        // Reset success message after 3 seconds
        setTimeout(() => setSuccess(''), 3000)
      } else {
        setError('Failed to send response')
      }
    } catch (err) {
      setError('An error occurred while sending response')
      console.error(err)
    } finally {
      setResponseLoading(false)
    }
  }

  const handleInputChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value
    })
  }

  const handleImageChange = (e) => {
    if (e.target.name === 'imageUrl') {
      // Handle image URL input
      setProductData({
        ...productData,
        imageUrl: e.target.value
      });
    } else if (e.target.files && e.target.files[0]) {
      // Handle file input (existing functionality)
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const token = localStorage.getItem('token');
      
      // Create product data without image first
      const productPayload = {
        ...productData,
        price: parseFloat(productData.price),
        discount: parseFloat(productData.discount) || 0
      };

      const response = await productAPI.createProduct(productPayload, token);
      
      if (response.success) {
        // If product created successfully, handle image if provided
        if (productData.imageUrl) {
          // Update product with image URL
          const updateResponse = await productAPI.updateProduct(
            response.data._id, 
            { image: productData.imageUrl }, 
            token
          );
          
          if (!updateResponse.success) {
            console.error('Failed to update image URL:', updateResponse.message);
          }
        } else if (image) {
          // Upload the image file
          const formData = new FormData();
          formData.append('file', image);
          
          const uploadResponse = await productAPI.uploadProductPhoto(response.data._id, formData, token);
          
          if (!uploadResponse.success) {
            console.error('Failed to upload image:', uploadResponse.message);
          }
        }
        
        setSuccess(true);
        // Reset form
        setProductData({
          name: '',
          description: '',
          price: '',
          discount: '',
          category: 'technology',
          imageUrl: ''
        });
        setImage(null);
        // Refresh products list
        fetchSellerProducts();
        // Close modal after a short delay
        setTimeout(() => {
          setShowAddProduct(false);
          setSuccess(false);
        }, 1500);
      } else {
        setError(response.message || 'Failed to create product');
      }
    } catch (err) {
      setError('An error occurred while creating the product');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleEditProduct = (product) => {
    setEditingProduct(product)
    setProductData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      discount: product.discount?.toString() || '0',
      category: product.category,
      imageUrl: product.image && !product.image.includes('no-photo') ? product.image : ''
    })
    setImage(null)
    setShowEditProduct(true)
  }

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const token = localStorage.getItem('token');
      
      // Update product data
      const productPayload = {
        ...productData,
        price: parseFloat(productData.price),
        discount: parseFloat(productData.discount) || 0
      };

      const response = await productAPI.updateProduct(editingProduct._id, productPayload, token);
      
      if (response.success) {
        // If product updated successfully, handle image if provided
        if (productData.imageUrl) {
          // Update product with image URL
          const updateResponse = await productAPI.updateProduct(
            editingProduct._id, 
            { image: productData.imageUrl }, 
            token
          );
          
          if (!updateResponse.success) {
            console.error('Failed to update image URL:', updateResponse.message);
          }
        } else if (image) {
          // Upload the image file
          const formData = new FormData();
          formData.append('file', image);
          
          const uploadResponse = await productAPI.uploadProductPhoto(editingProduct._id, formData, token);
          
          if (!uploadResponse.success) {
            console.error('Failed to upload image:', uploadResponse.message);
          }
        }
        
        setSuccess(true);
        // Refresh products list
        fetchSellerProducts();
        // Close modal after a short delay
        setTimeout(() => {
          setShowEditProduct(false);
          setSuccess(false);
        }, 1500);
      } else {
        setError(response.message || 'Failed to update product');
      }
    } catch (err) {
      setError('An error occurred while updating the product');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const token = localStorage.getItem('token')
        const response = await productAPI.deleteProduct(productId, token)
        
        if (response.success) {
          // Remove the product from the local state
          setProducts(products.filter(product => product._id !== productId))
          // Show success message or just refresh the list
        } else {
          alert('Failed to delete product: ' + (response.message || 'Unknown error'))
        }
      } catch (err) {
        console.error('Error deleting product:', err)
        alert('An error occurred while deleting the product')
      }
    }
  }

  // Function to get product image URL
  const getProductImageUrl = (product) => {
    console.log('Getting product image URL for:', product.image);
    if (!product || !product.image) {
      return 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&h=300';
    }
    
    // For local images, use the correct path with the full URL
    if (product.image.startsWith('/uploads/')) {
      return `http://localhost:5000${product.image}`;
    }
    
    // For the default no-photo image
    if (product.image === '/uploads/no-photo.jpg' || product.image === 'no-photo.jpg') {
      return 'http://localhost:5000/uploads/no-photo.jpg';
    }
    
    // For external images, use as is
    if (product.image.startsWith('http://') || product.image.startsWith('https://')) {
      return product.image;
    }
    
    // Default case - assume it's a local image
    return `http://localhost:5000/uploads/${product.image}`;
  };

  // If user is not loaded yet, show loading state
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    )
  }

  // If user is not authenticated or not a seller, redirect to login
  if (!user || user.role !== 'seller') {
    navigate('/login')
    return null
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <motion.header 
        className="bg-white shadow-lg"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <motion.h1 
            className="text-3xl font-bold text-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Seller Dashboard
          </motion.h1>
          <motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button 
              onClick={() => setShowAddProduct(true)}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add Product
            </motion.button>
          </motion.div>
        </div>
      </motion.header>

      <motion.main 
        className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-6 transition-transform duration-300 ease-in-out transform hover:-translate-y-1"
            variants={item}
            whileHover={{ y: -10 }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">My Products</h2>
            </div>
            <p className="text-gray-600 mb-6">View and manage your products</p>
            <motion.button 
              onClick={fetchSellerProducts}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 w-full"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Refresh Products
            </motion.button>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-6 transition-transform duration-300 ease-in-out transform hover:-translate-y-1"
            variants={item}
            whileHover={{ y: -10 }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">User Queries</h2>
            </div>
            <p className="text-gray-600 mb-6">View and respond to user contact queries</p>
            <motion.button 
              onClick={() => {
                setShowContactQueries(true)
                fetchContactQueries()
              }}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 w-full"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              View Queries
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div 
          className="bg-white rounded-xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Products</h2>
          
          {productsError && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {productsError}
            </div>
          )}
          
          {productsLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading your products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">You haven't added any products yet.</p>
              <motion.button 
                onClick={() => setShowAddProduct(true)}
                className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Add Your First Product
              </motion.button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <motion.div 
                  key={product._id} 
                  className="border rounded-lg p-4 transition-transform duration-300 ease-in-out transform hover:-translate-y-1"
                  whileHover={{ y: -5 }}
                >
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-40 mb-4 overflow-hidden">
                    <img 
                      src={getProductImageUrl(product)} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                      // onError={(e) => {
                      //   e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&h=300'
                      // }}
                    />
                    {/* <img src={"http://localhost:5000"+product?.image}/> */}
                  </div>
                  <h3 className="font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-gray-600 text-sm capitalize">{product.category}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-bold text-lg text-gray-800">
                      ${product.discount ? (product.price * (1 - product.discount / 100)).toFixed(2) : product.price.toFixed(2)}
                    </span>
                    {product.discount > 0 && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.price.toFixed(2)}
                      </span>
                    )}
                    <div className="flex space-x-2">
                      <motion.button 
                        onClick={() => handleEditProduct(product)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        Edit
                      </motion.button>
                      <motion.button 
                        onClick={() => handleDeleteProduct(product._id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        Delete
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.main>

      {/* Add Product Modal */}
      <AnimatePresence>
        {showAddProduct && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-xl shadow-xl w-full max-w-md my-8 mx-auto max-h-[90vh] flex flex-col"
              initial={{ scale: 0.8, y: -50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: -50 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <div className="p-6 flex-grow overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-semibold text-gray-800">Add New Product</h3>
                  <motion.button 
                    onClick={() => setShowAddProduct(false)}
                    className="text-gray-500 hover:text-gray-700"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col h-full">
                  {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
                      Product created successfully!
                    </div>
                  )}
                  <div className="space-y-4 flex-grow">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={productData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter product name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={productData.description}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter product description"
                        rows={3}
                        required
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price ($)
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={productData.price}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter price"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Discount (%)
                      </label>
                      <input
                        type="number"
                        name="discount"
                        value={productData.discount}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter discount percentage"
                        min="0"
                        max="100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select 
                        name="category"
                        value={productData.category}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="technology">Technology</option>
                        <option value="clothing">Clothing</option>
                        <option value="home appliances">Home Appliances</option>
                      </select>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Product Image
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                              Image URL
                            </label>
                            <input
                              type="text"
                              name="imageUrl"
                              value={productData.imageUrl || ''}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                              placeholder="https://example.com/image.jpg"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                              Upload Image
                            </label>
                            <div className="flex items-center justify-center w-full">
                              <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed rounded-lg cursor-pointer border-gray-300 hover:border-blue-400 transition-colors duration-200 bg-gray-50 hover:bg-gray-100">
                                <div className="flex flex-col items-center justify-center pt-1 pb-1">
                                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                  <p className="text-xs text-gray-500 mt-1">Click to upload</p>
                                </div>
                                <input 
                                  type="file" 
                                  className="hidden"
                                  onChange={handleImageChange}
                                  accept="image/*"
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                        <p className="mt-2 text-xs text-gray-500">Enter an image URL or upload an image file. If both are provided, the URL will be used.</p>
                      </div>
                    </div>

                  </div>
                  <div className="mt-6 flex justify-end space-x-3 pt-4 border-t border-gray-200">
                    <motion.button
                      type="button"
                      onClick={() => setShowAddProduct(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={loading}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={loading}
                    >
                      {loading ? 'Adding...' : 'Add Product'}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Product Modal */}
      <AnimatePresence>
        {showEditProduct && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-xl shadow-xl w-full max-w-md my-8 mx-auto max-h-[90vh] flex flex-col"
              initial={{ scale: 0.8, y: -50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: -50 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <div className="p-6 flex-grow overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-semibold text-gray-800">Edit Product</h3>
                  <motion.button 
                    onClick={() => setShowEditProduct(false)}
                    className="text-gray-500 hover:text-gray-700"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>
                <form onSubmit={handleSubmitEdit} className="flex flex-col h-full">
                  {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
                      Product updated successfully!
                    </div>
                  )}
                  <div className="space-y-4 flex-grow">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={productData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter product name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={productData.description}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter product description"
                        rows={3}
                        required
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price ($)
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={productData.price}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter price"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Discount (%)
                      </label>
                      <input
                        type="number"
                        name="discount"
                        value={productData.discount}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter discount percentage"
                        min="0"
                        max="100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select 
                        name="category"
                        value={productData.category}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="technology">Technology</option>
                        <option value="clothing">Clothing</option>
                        <option value="home appliances">Home Appliances</option>
                      </select>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Product Image
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                              Image URL
                            </label>
                            <input
                              type="text"
                              name="imageUrl"
                              value={productData.imageUrl || ''}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                              placeholder="https://example.com/image.jpg"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                              Upload Image
                            </label>
                            <div className="flex items-center justify-center w-full">
                              <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed rounded-lg cursor-pointer border-gray-300 hover:border-blue-400 transition-colors duration-200 bg-gray-50 hover:bg-gray-100">
                                <div className="flex flex-col items-center justify-center pt-1 pb-1">
                                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                  <p className="text-xs text-gray-500 mt-1">Click to upload</p>
                                </div>
                                <input 
                                  type="file" 
                                  className="hidden"
                                  onChange={handleImageChange}
                                  accept="image/*"
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                        <p className="mt-2 text-xs text-gray-500">Enter an image URL or upload an image file. If both are provided, the URL will be used.</p>
                      </div>
                    </div>

                  </div>
                  <div className="mt-6 flex justify-end space-x-3 pt-4 border-t border-gray-200">
                    <motion.button
                      type="button"
                      onClick={() => setShowEditProduct(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={loading}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={loading}
                    >
                      {loading ? 'Updating...' : 'Update Product'}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Queries Modal */}
      <AnimatePresence>
        {showContactQueries && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-xl shadow-xl w-full max-w-4xl my-8 mx-auto max-h-[90vh] flex flex-col"
              initial={{ scale: 0.8, y: -50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: -50 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <div className="p-6 flex-grow overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-semibold text-gray-800">User Contact Queries</h3>
                  <motion.button 
                    onClick={() => setShowContactQueries(false)}
                    className="text-gray-500 hover:text-gray-700"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                {contactLoading ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600">Loading contact queries...</p>
                  </div>
                ) : error ? (
                  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                    {error}
                  </div>
                ) : success ? (
                  <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
                    {success}
                  </div>
                ) : contactQueries.length > 0 ? (
                  <div className="space-y-4">
                    {contactQueries.map((contact) => (
                      <div key={contact._id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-gray-800">{contact.subject}</h4>
                            <p className="text-gray-600 mt-1">{contact.message}</p>
                            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                              <div>
                                <span className="font-medium text-gray-700">Name:</span>
                                <span className="ml-2 text-gray-600">{contact.name}</span>
                              </div>
                              <div>
                                <span className="font-medium text-gray-700">Email:</span>
                                <span className="ml-2 text-gray-600">{contact.email}</span>
                              </div>
                              <div>
                                <span className="font-medium text-gray-700">Date:</span>
                                <span className="ml-2 text-gray-600">
                                  {new Date(contact.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <motion.button
                            onClick={() => {
                              setSelectedContact(contact)
                              setShowResponseModal(true)
                            }}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg text-sm"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Respond
                          </motion.button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600">No contact queries available</p>
                  </div>
                )}

                <div className="mt-6 flex justify-end">
                  <motion.button
                    onClick={() => setShowContactQueries(false)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Response Modal */}
      <AnimatePresence>
        {showResponseModal && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-xl shadow-xl w-full max-w-2xl my-8 mx-auto max-h-[90vh] flex flex-col"
              initial={{ scale: 0.8, y: -50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: -50 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <div className="p-6 flex-grow overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-semibold text-gray-800">Respond to Query</h3>
                  <motion.button 
                    onClick={() => setShowResponseModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                {selectedContact && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800">{selectedContact.subject}</h4>
                    <p className="text-gray-600 mt-2">{selectedContact.message}</p>
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">From:</span>
                        <span className="ml-2 text-gray-600">{selectedContact.name}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Email:</span>
                        <span className="ml-2 text-gray-600">{selectedContact.email}</span>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={sendContactResponse}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Response
                    </label>
                    <textarea
                      value={responseMessage}
                      onChange={(e) => setResponseMessage(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter your response..."
                      rows={5}
                      required
                    ></textarea>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <motion.button
                      type="button"
                      onClick={() => setShowResponseModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={responseLoading}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={responseLoading}
                    >
                      {responseLoading ? 'Sending...' : 'Send Response'}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SellerDashboard