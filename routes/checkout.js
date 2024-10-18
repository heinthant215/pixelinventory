const express = require('express');
const router = express.Router();
const Order = require('../models/Order');  // Your Order model

// Checkout Route
router.post('/checkout', async (req, res) => {
  try {
    const cartItems = req.body.cartItems;

    // Calculate total amount
    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Create a new order
    const newOrder = new Order({
      user: req.user._id,  // Assuming the user is logged in
      products: cartItems,
      totalAmount,
      status: 'pending',
    });

    await newOrder.save();

    res.json({ success: true, message: 'Order placed successfully!' });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ success: false, message: 'Failed to place the order.' });
  }
});

module.exports = router;
