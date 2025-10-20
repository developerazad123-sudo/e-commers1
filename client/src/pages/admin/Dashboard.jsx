import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const AdminDashboard = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    // Logout logic would go here
    navigate('/login')
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
            Admin Dashboard
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <button 
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Logout
            </button>
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
              <h2 className="text-2xl font-semibold text-gray-800">Manage Products</h2>
            </div>
            <p className="text-gray-600 mb-6">View, add, edit, or delete products</p>
            <motion.button 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 w-full"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Manage Products
            </motion.button>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-6 transition-transform duration-300 ease-in-out transform hover:-translate-y-1"
            variants={item}
            whileHover={{ y: -10 }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Manage Users</h2>
            </div>
            <p className="text-gray-600 mb-6">View, delete, or block users</p>
            <motion.button 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 w-full"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Manage Users
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Manage Sellers</h2>
            </div>
            <p className="text-gray-600 mb-6">View, delete, or block sellers</p>
            <motion.button 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 w-full"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Manage Sellers
            </motion.button>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-6 transition-transform duration-300 ease-in-out transform hover:-translate-y-1"
            variants={item}
            whileHover={{ y: -10 }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Reports & Analytics</h2>
            </div>
            <p className="text-gray-600 mb-6">View sales reports and analytics</p>
            <motion.button 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 w-full"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              View Reports
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div 
          className="bg-white rounded-xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Recent Activities</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <motion.div 
                key={item} 
                className="border-b pb-4 last:border-b-0"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * item }}
              >
                <div className="flex justify-between">
                  <p className="font-medium text-gray-800">Activity {item}</p>
                  <span className="text-gray-500 text-sm">2 hours ago</span>
                </div>
                <p className="text-gray-600">Description of the activity performed by admin</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.main>
    </div>
  )
}

export default AdminDashboard