const mongoose = require("mongoose");

// Define schema for cart item
const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // Reference to the Product collection/table
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  heading: String,
  price: Number,
  imgurl: String,
  insertionTime: {
    type: String, // or Date type if you prefer
    default: () => new Date().toLocaleString()
  }
});

// Define schema for Cart collection/table
const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User collection/table
    required: true,
  },
  items: [cartItemSchema], // Array of cart items
});

// Create model for Cart
const CartModal = mongoose.model("Cart", cartSchema);

module.exports = CartModal;
