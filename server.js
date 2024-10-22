const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/User");
const bcrypt = require("bcryptjs"); // Import bcrypt for password hashing
const flash = require("connect-flash");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

// Set EJS as the view engine
app.set("view engine", "ejs");

// Set the views directory
app.set("views", path.join(__dirname, "views"));

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session middleware (to store user sessions)
app.use(
  session({
    secret: "secretKey",
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
      console.log("Attempting to log in with username:", username); // Debugging log

      // Find user by username (case-insensitive)
      const user = await User.findOne({ username: new RegExp("^" + username + "$", "i") });
      
      if (!user) {
        console.log("User not found with username:", username); // Debugging log
        return done(null, false, { message: "Incorrect username." });
      }

      // Compare the password using bcrypt
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log("Password does not match for username:", username); // Debugging log
        return done(null, false, { message: "Incorrect password." });
      }

      return done(null, user);
    } catch (err) {
      console.error("Error during login process:", err);
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
    successRedirect: "/admin/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

// Admin dashboard route (only accessible after login)
app.get("/admin/dashboard", ensureAdmin, (req, res) => {
  res.render("admin-dashboard", { user: req.user });
});

// Middleware to ensure the user is authenticated and isAdmin is true
function ensureAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.isAdmin) {
    return next();
  }
  res.redirect("/login");
}

// MongoDB connection
mongoose
  .connect("mongodb+srv://hzerotwo002:H305898S@henry215x.myiys.mongodb.net/?retryWrites=true&w=majority&appName=henry215x", {
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

// Routes
const orderRoutes = require("./routes/order");
app.use("/orders", orderRoutes);

const adminRoutes = require("./routes/admin");
app.use("/admin", adminRoutes);
