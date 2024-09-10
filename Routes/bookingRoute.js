const express = require('express');
const router = express.Router();
const { createBooking } = require('../Controller/bookingController');

// Create a new booking
router.post('/bookings', createBooking);

module.exports = router;
