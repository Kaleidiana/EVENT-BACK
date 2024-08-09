const express = require('express');
const eventController = require('../Controller/eventController');

const router = express.Router();

// Route to create a new event
router.post('/events', eventController.createEvent);

// Route to view all events
router.get('/events', eventController.viewAllEvents);

// Route to view a single event
router.get('/events/:id', eventController.viewEvent);

// Route to update an event
router.put('/events/:id', eventController.editEvent);

// Route to delete an event
router.delete('/events/:id', eventController.deleteEvent);

module.exports = router;
