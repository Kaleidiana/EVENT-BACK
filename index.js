// index.js
require('./helpers/init_mongodb'); // Initialize MongoDB and load environment variables

const express = require('express');
const cors = require('cors');
const eventRoute = require('./Routes/eventRoute');
const authRoute = require('./Routes/authRoute');

const app = express();

app.use(cors({
  credentials: true, // Allow credentials
  origin: [
    'http://localhost:3000',
    'http://localhost:4000'
  ]
}));

app.use(express.json());

app.use('/events', eventRoute); // Prefix routes with '/events'
app.use('/auth', authRoute); // Prefix routes with '/auth'

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT || 4000}`);
});

// Handling 404 errors
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
});
