const express = require("express");
const session = require("express-session"); // To handle sessions
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/User"); // Ensure User model is imported
const flash = require("connect-flash"); // Flash messages middleware
const path = require("path"); // To manage views directory
const mongoose = require("mongoose");

const app = express();

// Set EJS as the view engine
app.set("view engine", "ejs");

// Set the views directory
app.set("views", path.join(__dirname, "views")); // Assuming views folder is in the project directory

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session middleware (to store user sessions)
app.use(
  session({
    secret: "secretKey", // Replace with a strong secret in production
    resave: false,
    saveUninitialized: true,
  })
);

// Use flash middleware for displaying error messages
app.use(flash());

// Initialize passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Use async/await for the Passport local strategy
passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      // Find user by username
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      if (user.password !== password) { // Use password hashing in production
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// Serialize user for session storage
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Root route (redirect to login)
app.get("/", (req, res) => {
  res.redirect("/login");
});

// Login route (GET)
app.get("/login", (req, res) => {
  const message = req.flash("error");
  res.render("login", { message });
});

// Login form submission (POST)
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/admin/dashboard", // Redirect to admin dashboard on success
    failureRedirect: "/login", // Redirect back to login on failure
    failureFlash: true, // Enable flash messages for login errors
  })
);

// Admin dashboard route (only accessible after login)
app.get("/admin/dashboard", ensureAdmin, (req, res) => {
  // Pass the user object to the view
  res.render("admin-dashboard", { user: req.user });
});


// Middleware to ensure the user is authenticated and isAdmin is true
function ensureAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.isAdmin) {
    return next(); // Proceed to the next middleware (admin dashboard)
  }
  res.redirect("/login");
}

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/yourDatabaseName", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const orderRoutes = require('./routes/order');
app.use('/orders', orderRoutes);

const adminRoutes = require('./routes/admin');
app.use('/admin', adminRoutes);

