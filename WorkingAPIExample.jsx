import React, { useState } from 'react';

const WorkingAPIExample = () => {
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    role: 'user'
  });
  
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState(null);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');

  // Handle registration form changes
  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });
  };

  // Handle login form changes
  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  // Register user
  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage(`Registration successful! Welcome ${data.data.name}`);
        // Auto-fill login form with registered user data
        setLoginData({
          email: registerData.email,
          password: registerData.password,
          role: registerData.role
        });
      } else {
        setMessage(`Registration failed: ${data.error}`);
      }
    } catch (error) {
      setMessage(`Network error: ${error.message}`);
    }
  };

  // Login user
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setToken(data.token);
        setUserData(data.data);
        setMessage(`Login successful! Welcome ${data.data.name}`);
        // Save token to localStorage
        localStorage.setItem('token', data.token);
      } else {
        setMessage(`Login failed: ${data.error}`);
      }
    } catch (error) {
      setMessage(`Network error: ${error.message}`);
    }
  };

  // Get current user
  const handleGetMe = async () => {
    setMessage('');
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setUserData(data.data);
        setMessage('User data retrieved successfully');
      } else {
        setMessage(`Request failed: ${data.error}`);
      }
    } catch (error) {
      setMessage(`Network error: ${error.message}`);
    }
  };

  // Get products
  const handleGetProducts = async () => {
    setMessage('');
    
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      
      if (response.ok) {
        setProducts(data.data);
        setMessage(`Found ${data.count} products`);
      } else {
        setMessage(`Request failed: ${data.error}`);
      }
    } catch (error) {
      setMessage(`Network error: ${error.message}`);
    }
  };

  // Logout
  const handleLogout = () => {
    setToken('');
    setUserData(null);
    setMessage('Logged out successfully');
    localStorage.removeItem('token');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Working API Example</h1>
      <p>Test all Akario Mart API endpoints here</p>
      
      {/* Messages */}
      {message && (
        <div style={{
          padding: '10px',
          margin: '10px 0',
          backgroundColor: message.includes('failed') || message.includes('error') ? '#f8d7da' : '#d4edda',
          color: message.includes('failed') || message.includes('error') ? '#721c24' : '#155724',
          borderRadius: '4px'
        }}>
          {message}
        </div>
      )}
      
      {/* Registration Form */}
      <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={registerData.name}
              onChange={handleRegisterChange}
              required
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={registerData.email}
              onChange={handleRegisterChange}
              required
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="password"
              name="password"
              placeholder="Password (min 6 characters)"
              value={registerData.password}
              onChange={handleRegisterChange}
              required
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <select
              name="role"
              value={registerData.role}
              onChange={handleRegisterChange}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            >
              <option value="user">User</option>
              <option value="seller">Seller</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button 
            type="submit"
            style={{ 
              backgroundColor: '#007bff', 
              color: 'white', 
              padding: '10px 20px', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            Register
          </button>
        </form>
      </div>
      
      {/* Login Form */}
      <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginData.email}
              onChange={handleLoginChange}
              required
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <select
              name="role"
              value={loginData.role}
              onChange={handleLoginChange}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            >
              <option value="user">User</option>
              <option value="seller">Seller</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button 
            type="submit"
            style={{ 
              backgroundColor: '#28a745', 
              color: 'white', 
              padding: '10px 20px', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            Login
          </button>
        </form>
      </div>
      
      {/* User Actions */}
      <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h2>User Actions</h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            onClick={handleGetMe}
            disabled={!token}
            style={{ 
              backgroundColor: token ? '#17a2b8' : '#6c757d', 
              color: 'white', 
              padding: '10px 20px', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: token ? 'pointer' : 'not-allowed' 
            }}
          >
            Get My Info
          </button>
          
          <button 
            onClick={handleGetProducts}
            style={{ 
              backgroundColor: '#ffc107', 
              color: 'black', 
              padding: '10px 20px', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            Get Products
          </button>
          
          <button 
            onClick={handleLogout}
            disabled={!token}
            style={{ 
              backgroundColor: token ? '#dc3545' : '#6c757d', 
              color: 'white', 
              padding: '10px 20px', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: token ? 'pointer' : 'not-allowed' 
            }}
          >
            Logout
          </button>
        </div>
      </div>
      
      {/* User Data Display */}
      {userData && (
        <div style={{ backgroundColor: '#e9ecef', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
          <h2>User Information</h2>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
      )}
      
      {/* Products Display */}
      {products.length > 0 && (
        <div style={{ backgroundColor: '#e9ecef', padding: '20px', borderRadius: '8px' }}>
          <h2>Products</h2>
          <pre>{JSON.stringify(products, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default WorkingAPIExample;