// Import necessary modules
const mongoose = require("mongoose");

// Define schema for product
const productSchema = new mongoose.Schema({
  id: { type: String, unique: true }, // Make "id" field unique
  imgurl1: { type: String, required: false },
  imgurl2: { type: String, required: false },
  imgurl3: { type: String, required: false },
  imgurl4: { type: String, required: false },
  imgurl5: { type: String, required: false },
  heading: String,
  price: Number,
  features1: { type: String, required: false },
  features2: { type: String, required: false },
  features3: { type: String, required: false },
  features4: { type: String, required: false },
  category: String,
});

// Create Product model
const ProductModel = mongoose.model("Product", productSchema);

// Export the Product model
module.exports = ProductModel;
