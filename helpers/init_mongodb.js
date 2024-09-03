const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

// Use environment variable or default to local MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/eventsAPI';

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Could not connect to MongoDB:', err.message));
