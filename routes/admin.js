const express = require("express");
const Product = require("../models/product");
const User = require("../models/User");
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
  res.render("admin-dashboard");
});

// Add Product
router.post("/products/add", ensureAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect("/admin/products");
});

// Manage Users
router.get("/users", ensureAdmin, async (req, res) => {
  const users = await User.find();
  res.render("users", { users });
});

// Manage Orders (you can integrate Stripe orders here)
router.get("/orders", ensureAdmin, (req, res) => {
  res.render("orders"); // Placeholder for Stripe order management
});

module.exports = router;

// Edit product
router.get("/products/edit/:id", ensureAdmin, async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render("edit-product", { product });
});

router.post("/products/edit/:id", ensureAdmin, async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/admin/products");
});

// Delete product
router.post("/products/delete/:id", ensureAdmin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect("/admin/products");
});

// View all orders
router.get("/orders", ensureAdmin, async (req, res) => {
  const orders = await Order.find().populate("user");
  res.render("orders", { orders });
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
    res.status(500).send("Error creating sample order");
  }
});
