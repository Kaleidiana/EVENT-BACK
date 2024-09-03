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
  }
  // Remove selectedEvent from the schema
});

const User = mongoose.model('User', userSchema);
module.exports = User;
