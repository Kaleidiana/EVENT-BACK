const mongoose = require('mongoose');

// Define the event schema
const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  
  location: {
    type: String,
    required: [true, 'Location is required']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  price: {
    type: String,
    required: [true, 'Price is required']
  }
});

// Create the Event model
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
