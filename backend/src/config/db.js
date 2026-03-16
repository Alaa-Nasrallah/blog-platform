const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const connectDB = async () => {
  try {
    console.log('🔄 Attempting to connect to MongoDB...');
    console.log('📊 Using URI:', process.env.MONGODB_URI ? 'URI exists ✅' : 'URI missing ❌');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    
    // Seed admin user after connection
    await seedAdminUser();
    
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('Please check:');
    console.error('1. Your MONGODB_URI in .env file');
    console.error('2. Network access in MongoDB Atlas (allow all IPs)');
    console.error('3. Database user credentials');
    process.exit(1);
  }
};

const seedAdminUser = async () => {
  try {
    // Check if any admin exists
    const adminExists = await User.findOne({ role: 'admin' });
    
    if (!adminExists) {
      console.log('👤 Creating default admin user...');
      
      // Create default admin
      const hashedPassword = await bcrypt.hash('Admin123!', 10);
      
      await User.create({
        username: 'admin',
        email: 'admin@blog.com',
        password: hashedPassword,
        role: 'admin'
      });
      
      console.log('✅ Default admin user created');
      console.log('   Email: admin@blog.com');
      console.log('   Password: Admin123!');
    } else {
      console.log('✅ Admin user already exists');
    }
  } catch (error) {
    console.error('❌ Error seeding admin:', error);
  }
};

// Export the function
module.exports = connectDB;