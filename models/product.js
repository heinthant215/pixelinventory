const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  stock: { type: Number, default: 0 },
});

// Check if the model is already compiled
module.exports =
  mongoose.models.Product || mongoose.model("Product", productSchema);
