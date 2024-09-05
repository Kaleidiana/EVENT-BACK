const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // To handle CORS issues
const userRoute = require('./Routes/userRoute'); // Ensure the path is correct
const authRoute = require('./Routes/authRoute'); // If you have authentication routes
const eventRoute = require('./Routes/eventRoute'); // If you have event routes
const bookingRoute = require('./Routes/bookingRoute');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/users', userRoute); // Use /api/users as the base path for user routes
app.use('/api/auth', authRoute); // Adjust if you have auth routes
app.use('/api/events', eventRoute); // Adjust if you have event routes
app.use('/api/bookings', bookingRoute);

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 50000 // Increase timeout if necessary
})
  .then(() => console.log('MongoDB connected'))

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
