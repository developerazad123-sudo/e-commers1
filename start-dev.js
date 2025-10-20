const { spawn } = require('child_process');
const path = require('path');

console.log('Starting Akario Mart Development Servers...\n');

// Start backend server with error handling
console.log('Starting backend server...');
const backend = spawn('npm', ['run', 'dev'], {
  cwd: path.join(__dirname, 'server'),
  stdio: 'pipe',
  shell: true
});

backend.stdout.on('data', (data) => {
  const output = data.toString();
  console.log('[Backend]', output);
});

backend.stderr.on('data', (data) => {
  const output = data.toString();
  console.error('[Backend Error]', output);
});

backend.on('error', (error) => {
  console.error('[Backend] Failed to start:', error.message);
});

backend.on('close', (code) => {
  console.log(`[Backend] Process exited with code ${code}`);
});

// Start frontend server
console.log('Starting frontend server...');
const frontend = spawn('npm', ['run', 'dev'], {
  cwd: path.join(__dirname, 'client'),
  stdio: 'pipe',
  shell: true
});

frontend.stdout.on('data', (data) => {
  const output = data.toString();
  console.log('[Frontend]', output);
});

frontend.stderr.on('data', (data) => {
  const output = data.toString();
  console.error('[Frontend Error]', output);
});

frontend.on('error', (error) => {
  console.error('[Frontend] Failed to start:', error.message);
});

frontend.on('close', (code) => {
  console.log(`[Frontend] Process exited with code ${code}`);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\nShutting down servers...');
  backend.kill();
  frontend.kill();
  process.exit(0);
});

// Also handle normal exit
process.on('exit', () => {
  backend.kill();
  frontend.kill();
});