const User = require('../Models/authModel'); // Adjust path as necessary
const createError = require('http-errors');
const { authaaSchema } = require('../helpers/validationSchema'); // Adjust path as necessary
const { signAccessToken } = require('../helpers/jwtHelpers'); // Adjust path as necessary

// Register a new user
const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) throw createError.BadRequest('Email and password are required');
    await authaaSchema.validateAsync(req.body);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) throw createError.Conflict(`${email} is already registered`);

    // Create a new user
    const user = new User({ email, password });
    const savedUser = await user.save();
    
    // Generate an access token
    const accessToken = await signAccessToken(savedUser._id);
    
    res.status(201).json({ accessToken });
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};

// Login a user
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    await authaaSchema.validateAsync(req.body);

    // Find the user
    const user = await User.findOne({ email });
    if (!user) throw createError.NotFound('User not registered');

    // Verify password (assuming you have a method to compare passwords)
    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw createError.Unauthorized('Invalid credentials');

    // Generate an access token
    const accessToken = await signAccessToken(user._id);

    res.json({ accessToken });
  } catch (error) {
    if (error.isJoi) return next(createError.BadRequest('Invalid email or password'));
    next(error);
  }
};

// Get user profile (example)
const getUserProfile = async (req, res, next) => {
  try {
    const userId = req.user._id; // Assume user ID is available in req.user (set by authentication middleware)
    
    // Find the user
    const user = await User.findById(userId);
    if (!user) throw createError.NotFound('User not found');
    
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// Export the controller functions
module.exports = {
  registerUser,
  loginUser,
  getUserProfile
};
