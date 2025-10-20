import React from 'react'
import { formatCurrency } from '../../utils/format'
import { motion } from 'framer-motion'

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  // Access product details from the nested product object (backend format) or directly (local format)
  const product = item?.product || item
  
  // Get the product ID (use _id if available, otherwise id)
  const productId = product?._id || product?.id || item?._id || item?.id

  const discountedPrice = product?.discount 
    ? product.price * (1 - product.discount / 100)
    : product?.price

  const totalPrice = discountedPrice * (item?.quantity || 1)

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      onRemove(productId)
    } else {
      onUpdateQuantity(productId, newQuantity)
    }
  }

  return (
    <motion.div 
      className="flex flex-col sm:flex-row items-center border-b border-gray-200 py-6 cart-item"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.5)" }}
      transition={{ duration: 0.2 }}
    >
      {/* Display product image */}
      {product?.image ? (
        <motion.img 
          src={product.image} 
          alt={product.name} 
          className="w-full sm:w-24 h-24 object-contain mb-4 sm:mb-0 rounded-2xl"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&h=300';
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
      ) : (
        <div className="w-full sm:w-24 h-24 bg-gray-200 border-2 border-dashed rounded-2xl mb-4 sm:mb-0" />
      )}
      
      <div className="flex-1 sm:ml-6 w-full">
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <div className="mb-4 sm:mb-0">
            <motion.h3 
              className="font-semibold text-lg text-dark"
              whileHover={{ x: 5 }}
            >
              {product?.name || 'Product Name'}
            </motion.h3>
            <p className="text-neutral text-sm">{product?.category || 'Category'}</p>
            <div className="flex items-center mt-2">
              <span className="font-bold text-dark">{formatCurrency(discountedPrice)}</span>
              {product?.discount && (
                <span className="ml-2 badge-discount">
                  {product.discount}% OFF
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-wrap items-center space-x-4 gap-y-2 quantity-controls">
            <div className="flex items-center">
              <span className="font-bold text-dark mr-4">{formatCurrency(totalPrice)}</span>
              <div className="flex items-center bg-gray-100 rounded-lg">
                <motion.button 
                  onClick={() => handleQuantityChange(Math.max(0, (item.quantity || 1) - 1))}
                  className="text-dark hover:text-primary px-3 py-1 rounded-l-lg touch-target"
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(209, 213, 219, 0.5)" }}
                  whileTap={{ scale: 0.9 }}
                >
                  -
                </motion.button>
                <span className="mx-2 text-dark">{item?.quantity || 1}</span>
                <motion.button 
                  onClick={() => handleQuantityChange((item.quantity || 1) + 1)}
                  className="text-dark hover:text-primary px-3 py-1 rounded-r-lg touch-target"
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(209, 213, 219, 0.5)" }}
                  whileTap={{ scale: 0.9 }}
                >
                  +
                </motion.button>
              </div>
            </div>
            <motion.button 
              onClick={() => handleQuantityChange(0)}
              className="text-error hover:text-red-700 p-2 rounded-full touch-target"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(254, 226, 226, 0.5)" }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default CartItem