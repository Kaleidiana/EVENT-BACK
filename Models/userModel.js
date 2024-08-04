// userModel.js
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
});

const User = mongoose.model('User', userSchema);
module.exports = User;
