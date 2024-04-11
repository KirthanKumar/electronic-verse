// Import necessary modules
const express = require("express");
const ProductModel = require("../models/ProductModel");

// Create an instance of Express router
const router = express.Router();

// Define a route to fetch products by category
router.get("/category/:category", async (req, res) => {
  const { category } = req.params;
  // console.log(category);

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
router.get("/category/", async (req, res) => {
  try {
    // Fetch all products
    const products = await ProductModel.find();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint for sorting products by price
router.get("/sort", async (req, res) => {
  const { sortOption } = req.query;

  try {
    const sortOptions = {};

    if (sortOption === "leasttomost") {
      sortOptions.price = 1; // Sort by price in ascending order
    } else if (sortOption === "mosttoleast") {
      sortOptions.price = -1; // Sort by price in descending order
    }

    const products = await ProductModel.find().sort(sortOptions);
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint for categorysorting products by price
router.get("/categorysort", async (req, res) => {
  const { sortOption, category } = req.query;

  try {
    const sortOptions = {};

    if (sortOption === "leasttomost") {
      sortOptions.price = 1; // Sort by price in ascending order
    } else if (sortOption === "mosttoleast") {
      sortOptions.price = -1; // Sort by price in descending order
    }
    if (category !== "all") {
      const products = await ProductModel.find({ category }).sort(sortOptions);
      return res.json(products);
    } else if (category === "all") {
      const products = await ProductModel.find().sort(sortOptions);
      return res.json(products);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Export the router
module.exports = router;
