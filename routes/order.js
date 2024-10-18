const express = require('express');
const router = express.Router();
const Order = require('../models/order');  // Import the Order model

router.post('/checkout', async (req, res) => {
  try {
    const { cartItems } = req.body;  // Retrieve cart items from frontend

    // Validate the cart items
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty!' });
    }

    // Calculate total price
    const totalAmount = cartItems.reduce((total, item) => {
      return total + item.price * (item.quantity || 1);  // Default quantity to 1
    }, 0);

    // Create a new order
    const newOrder = new Order({
      products: cartItems,
      totalAmount,
      user: req.user ? req.user._id : null,  // If user is logged in
      status: 'pending',
    });

    await newOrder.save();  // Save order to the database

    res.status(200).json({ success: true, message: 'Order placed successfully!' });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ success: false, message: 'An error occurred during checkout.' });
  }
});

module.exports = router;
