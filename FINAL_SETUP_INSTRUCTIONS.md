# 🚀 Akario Mart - Complete Server Setup Guide

## ✅ Current Status

I've successfully:
- Analyzed your frontend and backend configurations
- Created scripts to start both servers
- Created comprehensive setup guides
- Identified the exact issue preventing your servers from running properly

## ❌ The Problem

Your backend server is not running because it cannot connect to MongoDB. The error message confirms this:
```
MongoDB Connection Error: querySrv ENOTFOUND _mongodb._tcp.cluster0.abc123.mongodb.net
```

This happens because your [server/.env](file:///c%3A/Users/acer/OneDrive/Documents/AKARIO%20MART/server/.env) file contains placeholder values:
```
MONGO_URI=mongodb+srv://your_username:your_password@cluster0.abc123.mongodb.net/akariomart?retryWrites=true&w=majority
```

## 🛠️ Solution - Step by Step

### Step 1: Choose Your Database Option

You have two options:

#### Option A: MongoDB Atlas (Cloud Database - Recommended)
**Pros:** No local installation needed, accessible from anywhere
**Cons:** Requires internet connection

#### Option B: Local MongoDB Installation
**Pros:** Works offline, faster for development
**Cons:** Requires installation and setup

### Step 2: Implement Your Chosen Option

#### If you chose Option A (MongoDB Atlas):

1. **Create a MongoDB Atlas Account:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Click "Try Free" and create an account

2. **Follow the Setup Guide:**
   - Open and follow [MONGODB_ATLAS_SETUP.md](file:///c%3A/Users/acer/OneDrive/Documents/AKARIO%20MART/MONGODB_ATLAS_SETUP.md) step by step

3. **Update Your .env File:**
   After completing the setup guide, replace the placeholder values in [server/.env](file:///c%3A/Users/acer/OneDrive/Documents/AKARIO%20MART/server/.env):
   ```
   MONGO_URI=mongodb+srv://your_actual_username:your_actual_password@your_cluster_url/akariomart?retryWrites=true&w=majority
   ```

#### If you chose Option B (Local MongoDB):

1. **Install MongoDB:**
   - Download MongoDB Community Server from [here](https://www.mongodb.com/try/download/community)
   - Follow the Windows installation guide

2. **Start MongoDB Service:**
   - Press `Win + R`, type `services.msc`, press Enter
   - Find "MongoDB Server" service
   - Right-click and select "Start"

3. **Update Your .env File:**
   Change the MONGO_URI in [server/.env](file:///c%3A/Users/acer/OneDrive/Documents/AKARIO%20MART/server/.env) to:
   ```
   MONGO_URI=mongodb://localhost:27017/akariomart
   ```

### Step 3: Test Your Setup

Run the troubleshooting script to verify everything works:
```bash
node troubleshoot.js
```

You should see:
```
✅ MongoDB connection test passed!
🚀 You can now start your servers with: npm run dev
```

### Step 4: Start Your Servers

From the root directory, run:
```bash
npm run dev
```

This will start both servers simultaneously:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📁 Files I've Created to Help You

1. **[MONGODB_ATLAS_SETUP.md](file:///c%3A/Users/acer/OneDrive/Documents/AKARIO%20MART/MONGODB_ATLAS_SETUP.md)** - Complete guide to set up MongoDB Atlas
2. **[COMPLETE_SETUP_GUIDE.md](file:///c%3A/Users/acer/OneDrive/Documents/AKARIO%20MART/COMPLETE_SETUP_GUIDE.md)** - Detailed instructions to run the entire application
3. **[start-dev.js](file:///c%3A/Users/acer/OneDrive/Documents/AKARIO%20MART/start-dev.js)** - Script to start both servers simultaneously
4. **[test-mongodb.js](file:///c%3A/Users/acer/OneDrive/Documents/AKARIO%20MART/test-mongodb.js)** - Script to test MongoDB connectivity
5. **[troubleshoot.js](file:///c%3A/Users/acer/OneDrive/Documents/AKARIO%20MART/troubleshoot.js)** - Script to diagnose common issues
6. **[SOLUTION_SUMMARY.md](file:///c%3A/Users/acer/OneDrive/Documents/AKARIO%20MART/SOLUTION_SUMMARY.md)** - Summary of the solution

## 🚀 Ready to Go?

Once you've completed the MongoDB setup and updated your [server/.env](file:///c%3A/Users/acer/OneDrive/Documents/AKARIO%20MART/server/.env) file:

1. Run `node troubleshoot.js` to verify the connection
2. Run `npm run dev` to start both servers
3. Open http://localhost:5173 in your browser

Your Akario Mart application will be ready to use!

## 🆘 Need Help?

If you encounter any issues:
1. Check the troubleshooting output
2. Verify your MongoDB connection string
3. Ensure MongoDB service is running (for local installation)
4. Refer to the setup guides for detailed instructions

The frontend is already working correctly and will be available once you start the servers!