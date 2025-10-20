# MongoDB Atlas Setup Guide

To get your backend server running properly, you need to set up a MongoDB Atlas account. Follow these steps:

## Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Try Free" and create an account
3. Select the free tier (M0 Sandbox)

## Step 2: Create Cluster

1. After logging in, create a new cluster
2. Choose AWS provider and a free region (e.g., N. Virginia)
3. Keep all other settings as default
4. Click "Create Cluster" (it may take a few minutes)

## Step 3: Configure Database User

1. In your cluster dashboard, go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Create a user with:
   - Username: `akariomartuser`
   - Password: Create a strong password (note it down)
   - Built-in Role: Read and Write to any database

## Step 4: Configure Network Access

1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Select "Allow Access from Anywhere" (0.0.0.0/0) for development
4. Click "Confirm"

## Step 5: Get Connection String

1. Go back to your cluster dashboard
2. Click "Connect"
3. Choose "Connect your application"
4. Copy the connection string

## Step 6: Update Your .env File

Replace the MONGO_URI in your server/.env file with the connection string you copied, but make these changes:

1. Replace `<username>` with your database username (`akariomartuser`)
2. Replace `<password>` with your database user password
3. Replace `myFirstDatabase` with `akariomart`

Example:
```
MONGO_URI=mongodb+srv://akariomartuser:yourpassword@cluster0.abc123.mongodb.net/akariomart?retryWrites=true&w=majority
```

## Step 7: Restart Your Backend Server

After updating the .env file, restart your backend server:
```bash
cd server
npm run dev
```

Your backend should now connect to MongoDB Atlas successfully!