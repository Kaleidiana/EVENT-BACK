const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./Routes/userRoute'); // Ensure the path is correct

require('dotenv').config(); // Load environment variables

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Could not connect to MongoDB:', err.message));

const app = express();

app.use(express.json());
app.use('/api', userRoute); // Prefix routes with /api

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server running on http://localhost:${process.env.PORT || 4000}`);
});
