const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who placed the order
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    }
  ],
  totalPrice: { type: Number, required: true },
  paymentMethod: { type: String, required: true }, // e.g., 'Credit Card', 'PayPal'
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: String, required: true },
  },
  status: { type: String, default: 'Pending' }, // e.g., 'Pending', 'Shipped', 'Delivered'
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);
