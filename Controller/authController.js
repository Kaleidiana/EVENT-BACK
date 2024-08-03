const User = require('../Models/authModel');
const createError = require('http-errors');
const { authaaSchema } = require('../helpers/validationSchema');
const { signAccessToken } = require('../helpers/jwtHelpers');
const bcrypt = require('bcrypt');

module.exports = {
  registerUser: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw createError.BadRequest('Email and password are required');
      }

      // Validate request data
      const result = await authaaSchema.validateAsync(req.body);

      // Check if the user already exists
      const userExists = await User.findOne({ email: email });
      if (userExists) {
        throw createError.Conflict(`${email} is already registered`);
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(result.password, 10);
      const newUser = new User({ ...result, password: hashedPassword });

      // Save the user to the database
      const savedUser = await newUser.save();

      // Generate access token
      const accessToken = await signAccessToken(savedUser.id);

      // Send the token as a response
      res.status(201).send({ accessToken });
    } catch (error) {
      if (error.isJoi === true) {
        error.status = 422;
      }
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      // Validate the request data
      const result = await authaaSchema.validateAsync(req.body);

      // Check if the user exists
      const user = await User.findOne({ email: result.email });
      if (!user) {
        throw createError.NotFound('User not registered');
      }

      // Validate the password
      const isMatch = await bcrypt.compare(result.password, user.password);
      if (!isMatch) {
        throw createError.Unauthorized('Invalid email or password');
      }

      // Generate access token
      const accessToken = await signAccessToken(user.id);

      // Send the token as a response
      res.send({ accessToken });
    } catch (error) {
      if (error.isJoi === true) {
        return next(createError.BadRequest('Invalid email or password'));
      }
      next(error);
    }
  },
};
