console.log('🔍 DEBUG: Starting server-debug.js');

try {
  console.log('🔍 DEBUG: Loading dotenv...');
  const dotenv = require('dotenv');
  console.log('🔍 DEBUG: dotenv loaded successfully');
  
  console.log('🔍 DEBUG: Configuring dotenv...');
  dotenv.config();
  console.log('🔍 DEBUG: dotenv configured');
  
  console.log('🔍 DEBUG: Loading express...');
  const express = require('express');
  console.log('🔍 DEBUG: express loaded');
  
  console.log('🔍 DEBUG: Creating express app...');
  const app = express();
  console.log('🔍 DEBUG: express app created');
  
  console.log('🔍 DEBUG: Setting up test route...');
  app.get('/test', (req, res) => {
    console.log('🔍 DEBUG: Test route accessed');
    res.json({ message: 'Server is working!' });
  });
  
  const PORT = process.env.PORT || 5000;
  console.log(`🔍 DEBUG: Attempting to listen on port ${PORT}...`);
  
  const server = app.listen(PORT, () => {
    console.log(`✅ SUCCESS: Server is running on port ${PORT}`);
    console.log(`✅ Test at: http://localhost:${PORT}/test`);
  });
  
  server.on('error', (error) => {
    console.log('❌ ERROR: Server failed to start');
    console.log('❌ Error details:', error);
  });
  
} catch (error) {
  console.log('❌ ERROR: Caught an exception');
  console.log('❌ Error name:', error.name);
  console.log('❌ Error message:', error.message);
  console.log('❌ Full error:', error);
}

console.log('🔍 DEBUG: script execution completed');