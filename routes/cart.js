const express = require('express');
const router = express.Router();
const Order = require('../models/Order');  // Import your Order model

// Route to handle checkout and save order
router.post('/checkout', async (req, res) => {
    try {
        // Extract order data from request body
        const { items, totalAmount, paymentMethod, shippingAddress } = req.body;

        // Assuming the user is logged in, associate the order with the user
        const userId = req.user ? req.user._id : null;  // Use null for guest users

        // Create a new order
        const newOrder = new Order({
            user: userId,
            items: items,
            totalAmount: totalAmount,
            paymentMethod: paymentMethod,
            shippingAddress: shippingAddress,
            status: 'Pending',
            createdAt: new Date()
        });

        // Save the order in MongoDB
        await newOrder.save();

        // Send a success response back to the frontend
        res.status(200).json({ success: true, message: 'Order saved successfully!' });
    } catch (error) {
        console.error('Error saving order:', error);
        res.status(500).json({ success: false, message: 'Failed to save order.' });
    }
});

module.exports = router;
