// Import necessary modules
const express = require("express");
const ProductModel = require("../models/ProductModel");

// Create an instance of Express router
const router = express.Router();

// Define a route to fetch products by category
router.get("/:category", async (req, res) => {
  const { category } = req.params;

  try {
    // Fetch products based on category
    const products = await ProductModel.find({ category });
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// fetching all products
router.get("/", async (req, res) => {
  try {
    // Fetch all products
    const products = await ProductModel.find();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Export the router
module.exports = router;
