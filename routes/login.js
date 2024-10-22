// routes/auth.js or similar file
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Make sure to import your User model
const bcrypt = require('bcryptjs');

// Login route (GET) to show login form
router.get('/login', (req, res) => {
  res.render('login');  // Render the login page (make sure you have a login.ejs or HTML file in your views folder)
});

// Login route (POST) to handle login form submission
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });

    if (!user) {
      req.flash('error', 'User not found');
      return res.redirect('/login');  // Redirect back to login page if user is not found
    }

    // Use the comparePassword method to verify the password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      req.flash('error', 'Incorrect password');
      return res.redirect('/login');  // Redirect back to login page on incorrect password
    }

    // Manually log in the user if password matches
    req.login(user, (err) => {
      if (err) {
        req.flash('error', 'Login error');
        return res.redirect('/login');
      }
      // Redirect to admin dashboard after successful login
      return res.redirect('/admin/dashboard');
    });
  } catch (error) {
    console.error('Error during login:', error);
    req.flash('error', 'Server error');
    res.redirect('/login');
  }
});

module.exports = router;
