// routes/auth.js or similar file
const express = require('express');
const passport = require('passport');
const router = express.Router();

// Login route (GET) to show login form
router.get('/login', (req, res) => {
  res.render('login');  // Render the login page (make sure you have a login.ejs or HTML file in your views folder)
});

// Login route (POST) to handle login form submission
router.post('/login', passport.authenticate('local', {
  successRedirect: '/admin/dashboard',  // Redirect to admin dashboard upon successful login
  failureRedirect: '/login',  // Redirect back to login page on failure
  failureFlash: true
}));

module.exports = router;
