const express = require("express");
const passport = require("passport");
const bcrypt = require('bcryptjs');  // Required to hash the password
const User = require("../models/User");
const router = express.Router();

// Login Page
router.get("/login", (req, res) => res.render("login"));

// Register Page
router.get("/register", (req, res) => res.render("register"));

// Register POST
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const newUser = new User({ email, password });
  await newUser.save();
  res.redirect("/login");
});

// Custom Login POST (replacing Passport.js login)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      req.flash('error', 'User not found');
      return res.redirect('/login');
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      req.flash('error', 'Incorrect password');
      return res.redirect('/login');
    }

    req.login(user, (err) => {
      if (err) {
        req.flash('error', 'Login error');
        return res.redirect('/login');
      }
      return res.redirect('/admin/dashboard');
    });
  } catch (error) {
    console.error('Error during login:', error);
    req.flash('error', 'Server error');
    res.redirect('/login');
  }
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

// Route to create a new admin user
router.post('/create-admin', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const newAdmin = new User({
      username: username,
      password: hashedPassword,
      isAdmin: true
    });

    await newAdmin.save();
    res.status(201).send('Admin user created');
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(500).send('Error creating admin');
  }
});

module.exports = router;
