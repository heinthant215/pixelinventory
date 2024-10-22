const express = require("express");
const Product = require("../models/product");
const User = require("../models/User");
const Order = require('../models/Order'); // Assuming Order model is already created
const router = express.Router();

// Middleware to protect admin routes
function ensureAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.isAdmin) {
    return next();
  }
  res.redirect("/login");
}

// Admin Dashboard
router.get("/dashboard", ensureAdmin, (req, res) => {
  res.render("admin-dashboard", { user: req.user });
});

// Add Product
router.post("/products/add", ensureAdmin, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect("/admin/products");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding product");
  }
});

// View Products
router.get("/products", ensureAdmin, async (req, res) => {
  try {
    const products = await Product.find();
    res.render("admin-products", { products });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching products");
  }
});

// Edit Product
router.get("/products/edit/:id", ensureAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render("edit-product", { product });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching product");
  }
});

router.post("/products/edit/:id", ensureAdmin, async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/admin/products");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error editing product");
  }
});

// Delete Product
router.post("/products/delete/:id", ensureAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect("/admin/products");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting product");
  }
});

// Manage Users
router.get("/users", ensureAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.render("users", { users });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching users");
  }
});

// Manage Orders
router.get("/orders", ensureAdmin, async (req, res) => {
  try {
    const orders = await Order.find().populate("user");
    res.render("orders", { orders });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching orders");
  }
});

// Route to insert a sample order for testing
router.post("/create-sample-order", async (req, res) => {
  try {
    const sampleOrder = new Order({
      items: [
        { name: "Gaming Headset", price: 109, quantity: 1 },
        { name: "Gaming Controller", price: 189, quantity: 1 },
      ],
      totalAmount: 298,
      paymentMethod: "Credit Card",
      shippingAddress: {
        addressLine1: "123 Main St",
        addressLine2: "Apt 4B",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "USA",
      },
      user: "60e70a4b5c49a800154df7ff", // Replace with a valid user ID
      status: "Pending",
      createdAt: new Date(),
    });
    await sampleOrder.save();
    res.send("Sample order created");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating sample order");
  }
});

// Middleware to ensure user is logged in
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

// Route to handle order submission
router.post("/order", ensureAuthenticated, async (req, res) => {
  try {
    const { items, totalAmount, paymentMethod, shippingAddress } = req.body;

    // Create a new order
    const newOrder = new Order({
      user: req.user._id, // Reference the logged-in user
      items: items.map(item => ({
        product: item.productId,   // Product ID from the cart
        quantity: item.quantity,   // Quantity ordered
        price: item.price          // Product price
      })),
      totalAmount,
      paymentMethod,
      shippingAddress
    });

    await newOrder.save(); // Save the order to the database
    res.status(201).send("Order placed successfully");
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).send("Error placing order");
  }
});

module.exports = router;
