const express = require("express");
const passport = require("passport");
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

// Login POST
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/admin/dashboard",
    failureRedirect: "/login",
  })
);

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

module.exports = router;
