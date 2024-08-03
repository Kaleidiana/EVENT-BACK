// routes/eventRoutes.js

const express = require('express');
const eventController = require('../Controller/eventController');

const router = express.Router();
//Create an event
router.get('/events', eventController.createEvent);
// Route to view all events
router.get('/events', eventController.viewAllEvents);

// Route to view a single event
router.get('/events/:id', eventController.viewEvent);

// Route to edit an event
router.put('/events/:id', eventController.editEvent);

// Route to delete an event
router.delete('/events/:id', eventController.deleteEvent);

module.exports = router;

// routes/eventRoutes.js

