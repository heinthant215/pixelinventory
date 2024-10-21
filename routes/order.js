const express = require('express');
const Order = require('../models/order');
const router = express.Router();

// Submit an order
router.post('/submit-order', async (req, res) => {
  try {
    const { userId, items, totalAmount, paymentMethod, shippingAddress } = req.body;

    const newOrder = new Order({
      user: userId,
      items,
      totalAmount,
      paymentMethod,
      shippingAddress
    });

    await newOrder.save();
    res.status(200).json({ message: 'Order submitted successfully' });
  } catch (err) {
    console.error('Error submitting order:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
