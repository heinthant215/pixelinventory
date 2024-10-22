const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// POST route to place a new order
router.post('/order', async (req, res) => {
  try {
    const { userId, products, totalPrice, paymentMethod, shippingAddress } = req.body;

    // Create a new order
    const newOrder = new Order({
      userId,
      products,
      totalPrice,
      paymentMethod,
      shippingAddress,
    });

    // Save the order to MongoDB
    await newOrder.save();

    // Return success response
    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Failed to place order', error });
  }
});

module.exports = router;
