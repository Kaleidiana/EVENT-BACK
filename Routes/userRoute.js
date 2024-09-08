const express = require('express');
const userController = require('../Controller/userController'); // Ensure the path is correct
const { verifyAccessToken } = require('../helpers/jwtHelpers');

const routes = express.Router();

// Define routes without protection (no access token required)
routes.get('/getAllUsers', userController.getAllUsers);
routes.post('/registerUser', userController.registerUser);
routes.get('/getUser/:id', userController.getUser);

// Define routes with protection (access token required)
routes.patch('/updateUser/:id', verifyAccessToken, userController.updateUser);
routes.delete('/deleteUser/:id', verifyAccessToken, userController.deleteUser);

module.exports = routes;
