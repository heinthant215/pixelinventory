const mongoose = require('mongoose');

const uri = "mongodb+srv://hzerotwo002:H305898S@henry215x.myiys.mongodb.net/?retryWrites=true&w=majority&appName=henry215x"; // Replace with your actual MongoDB URI

mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB');
    mongoose.connection.close(); // Close the connection after success
  })
  .catch((err) => console.log('Error connecting to MongoDB:', err));
