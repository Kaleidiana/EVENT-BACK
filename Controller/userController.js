const User = require('../Models/userModel');

module.exports = {
  registerUser: async (req, res, next) => {
    try {
      const { firstname, lastname, gender } = req.body;
      if (!firstname || !lastname) {
        return res.status(400).json({ message: 'Firstname and Lastname are required' });
      }
      const newUser = new User({ firstname, lastname, gender });
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  },

  // Define other methods here
  getAllUsers: async (req, res, next) => {
    // Example method for getting all users
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  },

  updateUser: async (req, res, next) => {
    // Example method for updating a user
  },

  deleteUser: async (req, res, next) => {
    // Example method for deleting a user
  },

  getUser: async (req, res, next) => {
    // Example method for getting a user by ID
  },
};
