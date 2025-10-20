// This file will contain all API calls to the backend

const API_BASE_URL = 'http://localhost:5000/api'

// Helper function to make API requests
const apiRequest = async (url, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    })
    
    const data = await response.json()
    return { success: response.ok, ...data }
  } catch (error) {
    console.error(`API request failed for ${url}:`, error);
    return { success: false, message: 'Network error' }
  }
}

// Auth API
export const authAPI = {
  login: async (email, password, role) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, role })
    })
  },

  register: async (name, email, password, role) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, role })
    })
  }
}

// Product API
export const productAPI = {
  getProducts: async () => {
    return apiRequest('/products')
  },

  getProductById: async (id) => {
    return apiRequest(`/products/${id}`)
  },

  createProduct: async (productData, token) => {
    return apiRequest('/products', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
    })
  },

  updateProduct: async (id, productData, token) => {
    return apiRequest(`/products/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
    })
  },

  deleteProduct: async (id, token) => {
    return apiRequest(`/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },

  // Upload product photo
  uploadProductPhoto: async (id, formData, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}/photo`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      const data = await response.json();
      return { success: response.ok, ...data };
    } catch (error) {
      console.error('Error uploading product photo:', error);
      return { success: false, message: 'Network error or CORS issue' };
    }
  }
}

// User API
export const userAPI = {
  getUsers: async (token) => {
    return apiRequest('/users', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },

  deleteUser: async (id, token) => {
    return apiRequest(`/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },

  // Cart API
  getCart: async (token) => {
    return apiRequest('/users/cart', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },

  addToCart: async (productId, quantity, token) => {
    return apiRequest('/users/cart', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId, quantity })
    })
  },

  updateCart: async (productId, quantity, token) => {
    return apiRequest('/users/cart', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId, quantity })
    })
  },

  removeFromCart: async (productId, token) => {
    return apiRequest(`/users/cart/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },

  clearCart: async (token) => {
    return apiRequest('/users/cart', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },

  // Wishlist API
  getWishlist: async (token) => {
    return apiRequest('/users/wishlist', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },

  addToWishlist: async (productId, token) => {
    return apiRequest('/users/wishlist', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId })
    })
  },

  removeFromWishlist: async (productId, token) => {
    return apiRequest(`/users/wishlist/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },

  clearWishlist: async (token) => {
    return apiRequest('/users/wishlist', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },

  // Profile API
  updateProfile: async (userData, token) => {
    return apiRequest('/users/profile', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
  }
}

// Contact API
export const contactAPI = {
  sendMessage: async (messageData, token = null) => {
    const headers = {
      'Content-Type': 'application/json'
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return apiRequest('/contact', {
      method: 'POST',
      headers,
      body: JSON.stringify(messageData)
    })
  },

  getUserMessages: async (token) => {
    const response = await apiRequest('/contact/user', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response;
  }
}

// Seller Contact API
export const sellerContactAPI = {
  getContactMessages: async (token) => {
    return apiRequest('/seller/contact', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },

  sendContactResponse: async (contactId, responseMessage, token) => {
    return apiRequest(`/seller/contact/${contactId}/response`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ responseMessage })
    })
  },

  getContactResponses: async (token) => {
    return apiRequest('/seller/contact/responses', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }
}

export default {
  authAPI,
  productAPI,
  userAPI,
  contactAPI,
  sellerContactAPI
}