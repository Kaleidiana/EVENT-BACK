const User = require('../Models/userModel');

module.exports = {
  // Register a new user
  registerUser: async (req, res, next) => {
    try {
      const { firstname, lastname, gender, selectedEvent } = req.body;

      if (!firstname || !lastname) {
        return res.status(400).json({ message: 'Firstname and lastname are required' });
      }

      // Create a new user with selectedEvent
      const newUser = new User({ firstname, lastname, gender, selectedEvent });
      await newUser.save();

      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  },

  // Get all users
  // Example of correct getAllUsers implementation
getAllUsers: async (req, res) => {
  try {
    const users = await User.find().populate('selectedEvent');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
},

  // Update a user by ID
  updateUser: async (req, res, next) => {
    try {
      const userId = req.params.id;
      const updates = req.body;

      const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  },

  // Delete a user by ID
  deleteUser: async (req, res, next) => {
    try {
      const userId = req.params.id;

      const deletedUser = await User.findByIdAndDelete(userId);

      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      next(error);
    }
  },

  // Get a user by ID
  getUser: async (req, res, next) => {
    try {
      const userId = req.params.id;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
};
