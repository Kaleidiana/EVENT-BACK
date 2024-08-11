const express = require('express');
const userController = require('../Controller/userController'); // Ensure the path is correct
const { verifyAccessToken } = require('../helpers/jwtHelpers');

const routes = express.Router();

// Define the correct routes
routes.get('/getAllUsers', verifyAccessToken, userController.getAllUsers);
routes.post('/registerUser', userController.registerUser);
routes.patch('/updateUser/:id', verifyAccessToken, userController.updateUser);
routes.delete('/deleteUser/:id', verifyAccessToken, userController.deleteUser);
routes.get('/getUser/:id', verifyAccessToken, userController.getUser);

module.exports = routes;
