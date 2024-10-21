const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // User who placed the order
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  shippingAddress: {
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
