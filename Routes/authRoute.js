const express = require('express');
const routes = express.Router();
const authController = require('../Controller/authController');
const { authaaSchema } = require('../helpers/validationSchema');

// Middleware for validating request body against authaaSchema
const validateAuth = async (req, res, next) => {
  try {
    await authaaSchema.validateAsync(req.body);
    next(); // Proceed to the next middleware/controller if validation passes
  } catch (error) {
    next(error); // Pass validation error to the error handler
  }
};

// Register user route with validation middleware
routes.post('/register', validateAuth, authController.registerUser);

// Login route with validation middleware
routes.post('/login', validateAuth, authController.login);

module.exports = routes;
