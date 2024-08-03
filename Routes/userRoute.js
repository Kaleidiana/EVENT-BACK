const express = require('express');
const userController = require('../Controller/userController'); // Updated to use the correct controller
const { verifyAccessToken } = require('../helpers/jwtHelpers');

const routes = express.Router();

// Get a list of users from the database (authentication required)
routes.get('/getAllUsers', verifyAccessToken, userController.getAllUsers);

// Add a new user to the database
routes.post('/addUser', userController.addUser); // Updated to use the correct method name

// Update an existing user by ID
routes.patch('/updateUser/:id', userController.updateUser); // Updated to use the correct method name

// Delete a user by ID
routes.delete('/deleteUser/:id', userController.deleteUser); // Updated to use the correct method name

// Get a specific user by ID
routes.get('/getUser/:id', userController.getUser); // Updated to use the correct method name

module.exports = routes;
