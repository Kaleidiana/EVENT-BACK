const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const authSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  }
});

// Hash the password before saving the user
authSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(this.password, salt);
    this.password = hashedPwd;
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare entered password with stored hashed password
authSchema.methods.isValidPassword = async function(password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

const Auth = mongoose.models.Auth || mongoose.model('Auth', authSchema);
module.exports = Auth;
