const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'Firstname is required']
  },
  lastname: {
    type: String,
    required: [true, 'Lastname is required']
  },
  gender: {
    type: String,
  },
  selectedEvent: {
    type: mongoose.Schema.Types.ObjectId, // Store the ID of the selected event
    ref: 'Event'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
