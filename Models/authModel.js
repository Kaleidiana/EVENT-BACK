const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

// Define the user schema
const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true, // Ensure email is unique
        index: true, // Create an index on email
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6, // Ensure password has a minimum length
    },
    // Add additional fields if necessary
    // name: { type: String, required: [true, 'Name is required'] },
    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now },
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next(); // Only hash the password if it has been modified
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Compare password
userSchema.methods.isValidPassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
};

// Create the model
const User = mongoose.model('User', userSchema);

module.exports = User;
