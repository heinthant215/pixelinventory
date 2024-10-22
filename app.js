require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const flash = require('connect-flash');

// Load routes
const authRoutes = require('./routes/auth');  // Load your auth routes
const adminRoutes = require('./routes/admin');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order'); // <-- Add order route

// Express app setup
const app = express();
app.use(express.json());  // For handling JSON data
app.use(express.urlencoded({ extended: true })); // For handling URL-encoded data

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Passport config
require('./config/passport')(passport);

// Session middleware
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
}));

// Flash middleware
app.use(flash());

// Middleware to pass flash messages to all views
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success');
  res.locals.error_msg = req.flash('error');
  next();
});

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// View engine
app.set('view engine', 'ejs');

// Use routes
app.use('/', authRoutes);  // This makes auth routes accessible
app.use('/admin', adminRoutes);
app.use('/products', productRoutes);
app.use('/api', orderRoutes); // <-- Add this to use order route

// Route for 'Watch Stream'
app.get('/watch-stream', (req, res) => {
  res.render('watch-stream');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
