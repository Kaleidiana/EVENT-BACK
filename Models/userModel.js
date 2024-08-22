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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event' // Ensure this matches the name of your Event model
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
