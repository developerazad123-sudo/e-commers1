# Complete Setup and Run Guide

This guide will help you get both the frontend and backend servers running properly.

## Prerequisites

1. Node.js (v14 or higher) installed on your system
2. A MongoDB Atlas account (for cloud database) OR MongoDB installed locally

## Quick Start

### Option 1: Using the Root Script (Recommended)

1. Install all dependencies:
   ```bash
   npm run install:all
   ```

2. Start both servers simultaneously:
   ```bash
   npm run dev
   ```

### Option 2: Manual Start

1. Start the backend server:
   ```bash
   cd server
   npm run dev
   ```

2. In a new terminal, start the frontend server:
   ```bash
   cd client
   npm run dev
   ```

## Detailed Setup Instructions

### 1. Install Dependencies

From the root directory, run:
```bash
npm run install:all
```

This will install dependencies for:
- Root directory
- Server (backend)
- Client (frontend)

### 2. Configure MongoDB

You have two options:

#### Option A: MongoDB Atlas (Cloud - Recommended)

1. Follow the [MongoDB Atlas Setup Guide](MONGODB_ATLAS_SETUP.md)
2. Update the [server/.env](file:///c%3A/Users/acer/OneDrive/Documents/AKARIO%20MART/server/.env) file with your MongoDB Atlas connection string

#### Option B: Local MongoDB

1. Install MongoDB locally:
   - Windows: Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - macOS: `brew install mongodb-community`
   - Linux: Follow the [official installation guide](https://docs.mongodb.com/manual/administration/install-on-linux/)

2. Start MongoDB service:
   - Windows: `net start MongoDB`
   - macOS/Linux: `sudo systemctl start mongod`

3. Ensure your [server/.env](file:///c%3A/Users/acer/OneDrive/Documents/AKARIO%20MART/server/.env) file has:
   ```
   MONGO_URI=mongodb://localhost:27017/akariomart
   ```

### 3. Configure Environment Variables

Ensure your [server/.env](file:///c%3A/Users/acer/OneDrive/Documents/AKARIO%20MART/server/.env) file includes all required variables:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
```

### 4. Start the Servers

#### Method 1: Single Command (Recommended)

From the root directory:
```bash
npm run dev
```

This will start both servers concurrently.

#### Method 2: Separate Terminals

Terminal 1 (Backend):
```bash
cd server
npm run dev
```

Terminal 2 (Frontend):
```bash
cd client
npm run dev
```

## Accessing the Application

Once both servers are running:

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Troubleshooting

### Backend Server Issues

1. **MongoDB Connection Error**:
   - Ensure MongoDB is running
   - Check your MONGO_URI in [.env](file:///c%3A/Users/acer/OneDrive/Documents/AKARIO%20MART/server/.env) file
   - Verify network connectivity if using MongoDB Atlas

2. **Port Already in Use**:
   - Change the PORT in [.env](file:///c%3A/Users/acer/OneDrive/Documents/AKARIO%20MART/server/.env) file
   - Or kill the process using the port:
     ```bash
     # Windows
     netstat -ano | findstr :5000
     taskkill /PID <PID> /F
     
     # macOS/Linux
     lsof -i :5000
     kill -9 <PID>
     ```

### Frontend Server Issues

1. **Dependency Issues**:
   ```bash
   cd client
   npm install
   ```

2. **Port Already in Use**:
   - Vite will automatically use another port or you can specify:
   ```bash
   cd client
   npm run dev -- --port 3000
   ```

## Stopping the Servers

- If using the single command method, press `Ctrl+C`
- If using separate terminals, press `Ctrl+C` in each terminal

## Next Steps

1. Register a new user account
2. Explore the different role dashboards
3. Add products to cart and wishlist
4. Test the checkout process