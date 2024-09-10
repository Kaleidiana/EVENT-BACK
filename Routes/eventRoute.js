const express = require('express');
const router = express.Router();
const eventController = require('../Controller/eventController'); // Adjust the path if necessary

// Ensure that the methods in eventController are correctly defined
router.get('/', eventController.getAllEvents); // Ensure getAllEvents is defined
router.post('/', eventController.upload.single('image'), eventController.createEvent); // Ensure createEvent and upload are defined

module.exports = router;
