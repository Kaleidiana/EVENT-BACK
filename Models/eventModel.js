const mongoose = require('mongoose');

// Define the event schema
const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  location: {
    type: String,
    required: [true, 'Location is required']
  }
});

// Create the Event model
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;

