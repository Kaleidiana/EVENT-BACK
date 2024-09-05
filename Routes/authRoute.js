const express = require('express');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const User = require('../Models/userModel'); // Adjust the path as needed

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists and password is correct
  const user = await User.findOne({ email });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).send('Invalid email or password');
  }

  // Generate token
  const token = JWT.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET);

  res.json({ token });
});

module.exports = router;
