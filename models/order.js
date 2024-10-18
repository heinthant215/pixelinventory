const orderSchema = new mongoose.Schema({
    products: Array, // Store an array of products (or their ids)
    totalAmount: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference the user who placed the order
    status: { type: String, default: 'pending' }, // Status of the order
  });
  
  module.exports = mongoose.model('Order', orderSchema);
  