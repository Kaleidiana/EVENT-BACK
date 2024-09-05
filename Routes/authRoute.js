const express = require('express');
const routes = express.Router();
const authController = require('../Controller/authController');

  routes.post('/registerUser', authController.registerUser)

  routes.post('/login', authController.login)

module.exports = routes;