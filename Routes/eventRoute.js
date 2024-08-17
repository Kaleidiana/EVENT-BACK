const express = require('express');
const eventController = require('../Controller/eventController');

const router = express.Router();

// Route to create a new event
router.post('/', (req, res, next) => {
    console.log('POST /api/events route hit');
    next();
  }, eventController.createEvent);
  
// Route to view all events
router.get('/', eventController.viewAllEvents);

// Route to view a single event
router.get('/:id', eventController.viewEvent);

// Route to update an event
router.put('/:id', eventController.editEvent);

// Route to delete an event
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
