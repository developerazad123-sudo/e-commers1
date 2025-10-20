const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('Akario Mart - Troubleshooting Script\n');

// Check if required directories exist
const requiredDirs = ['client', 'server'];
const missingDirs = requiredDirs.filter(dir => !fs.existsSync(path.join(__dirname, dir)));

if (missingDirs.length > 0) {
  console.error(`❌ Missing directories: ${missingDirs.join(', ')}`);
  process.exit(1);
}

console.log('✅ Required directories found');

// Check if package.json files exist
const requiredFiles = [
  'package.json',
  'client/package.json',
  'server/package.json'
];

const missingFiles = requiredFiles.filter(file => !fs.existsSync(path.join(__dirname, file)));

if (missingFiles.length > 0) {
  console.error(`❌ Missing files: ${missingFiles.join(', ')}`);
  process.exit(1);
}

console.log('✅ Required package.json files found');

// Check if .env file exists in server
const envPath = path.join(__dirname, 'server', '.env');
if (!fs.existsSync(envPath)) {
  console.error('❌ server/.env file not found');
  console.log('Please create a .env file in the server directory with your MongoDB connection string');
  process.exit(1);
}

console.log('✅ server/.env file found');

// Read .env file and check for MONGO_URI
const envContent = fs.readFileSync(envPath, 'utf8');
if (!envContent.includes('MONGO_URI')) {
  console.error('❌ MONGO_URI not found in server/.env file');
  process.exit(1);
}

console.log('✅ MONGO_URI found in server/.env');

// Check if MongoDB URI is placeholder
if (envContent.includes('your_username') || envContent.includes('your_password')) {
  console.warn('⚠️  Warning: MongoDB URI appears to contain placeholder values');
  console.warn('Please update your server/.env file with actual MongoDB credentials');
  console.warn('Refer to MONGODB_ATLAS_SETUP.md for instructions');
}

console.log('\n✅ All basic checks passed!');

console.log('\n🔧 Running MongoDB connection test...');
const testMongo = spawn('node', [path.join(__dirname, 'test-mongodb.js')], {
  cwd: path.join(__dirname, 'server'),
  stdio: 'inherit'
});

testMongo.on('close', (code) => {
  if (code === 0) {
    console.log('\n✅ MongoDB connection test passed!');
    console.log('\n🚀 You can now start your servers with: npm run dev');
  } else {
    console.log('\n❌ MongoDB connection test failed');
    console.log('Please check your MongoDB configuration');
  }
});