const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the user schema
const userSchema = new Schema({
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
        enum: ['Male', 'Female', 'Other'], // Optional: Restrict gender to certain values
    },
    // Additional fields can be added here
    // email: { type: String, required: [true, 'Email is required'], unique: true },
    // password: { type: String, required: [true, 'Password is required'] },
    // createdAt: { type: Date, default: Date.now },
});

// Create the model
const User = mongoose.model('User', userSchema);

module.exports = User;
