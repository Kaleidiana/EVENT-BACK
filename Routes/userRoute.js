const express = require('express');
const userController = require('../Controller/userController'); // Ensure the path is correct
const { verifyAccessToken } = require('../helpers/jwtHelpers');

const routes = express.Router();

// Base path for user routes: /users
routes.get('/users/getAllUsers', verifyAccessToken, userController.getAllUsers);
routes.post('/users/registerUser', userController.registerUser);
routes.patch('/users/updateUser/:id', userController.updateUser);
routes.delete('/users/deleteUser/:id', userController.deleteUser);
routes.get('/users/getUser/:id', userController.getUser);

module.exports = routes;
