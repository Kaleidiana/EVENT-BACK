const User = require('../Models/authModel');
const createError = require('http-errors');
const { authaaSchema } = require('../helpers/validationSchema');
const { signAccessToken } = require('../helpers/jwtHelpers');

module.exports = {
  registerUser: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      // Validate request body
      if (!email || !password) throw createError.BadRequest('Email and password are required');
      const result = await authaaSchema.validateAsync(req.body);

      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) throw createError.Conflict(`${email} is already registered`);

      // Create and save new user
      const user = new User(result);
      const savedUser = await user.save();
      

      // Generate access token
      const accessToken = await signAccessToken(savedUser.id);

      // Respond with the access token
      res.send({ accessToken });
    } catch (error) {
      if (error.isJoi) error.status = 422;
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const result = await authaaSchema.validateAsync(req.body);
      const user = await User.findOne({ email: result.email });

      if (!user) {
        throw createError.NotFound('User not registered');
      }

      // Validate password
      const isMatch = await user.isValidPassword(result.password);
      if (!isMatch) {
        throw createError.Unauthorized('Invalid password');
      }

      // Generate access token
      const accessToken = await signAccessToken(user.id);

      // Respond with the access token
      res.send({ accessToken });
    } catch (error) {
      if (error.isJoi) {
        return next(createError.BadRequest('Invalid email/password'));
      }
      next(error);
    }
  }
};
