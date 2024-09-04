const express = require('express');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const User = require('../models/User'); // Import the User model

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  // Check if user exists and password is correct
  const user = await User.findOne({ email });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).send('Invalid email or password');
  }

  // Check if the role is correct
  if (role === 'Admin' && user.email !== 'your-admin-email@example.com') {
    return res.status(403).send('Only the admin can log in as Admin');
  }

  // Generate token
  const token = JWT.sign({ userId: user._id, role }, process.env.ACCESS_TOKEN_SECRET);

  res.json({ token });
});

module.exports = router;
