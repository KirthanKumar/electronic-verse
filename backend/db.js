// here we are using commonjs modules not ES6 modules

const mongoose = require("mongoose");
const productsData = require("./productData");
const mongoURI =
  "mongodb+srv://skirthankumar13579:" +
  encodeURIComponent("testingmern@kirthan") +
  "@mern.9b1vtuo.mongodb.net/electronic-verse";;
const ProductModel = require("./models/ProductModel");

const connectToMongo = () => {
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("Connected to MongoDB successfully");

      // Check if any products already exist in the database
      return ProductModel.findOne();
    })
    .then((existingProduct) => {
      if (!existingProduct) {
        // Insert all products data into the database if no products exist
        return ProductModel.insertMany(productsData).then(() => {
          console.log("All data inserted successfully");
        });
      } else {
        // Check if any new products need to be inserted
        return Promise.all(
          productsData.map((product) => {
            // Check if a document with the same "id" already exists in the database
            return ProductModel.findOne({ id: product.id }).then(
              (existingProduct) => {
                if (!existingProduct) {
                  // Insert the product data into the database if it doesn't already exist
                  return ProductModel.create(product);
                } else {
                  console.log(
                    `Product with id ${product.id} already exists. Skipping insertion.`
                  );
                  return Promise.resolve();
                }
              }
            );
          })
        ).then(() => {
          console.log("Additional data inserted successfully");
        });
      }
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
};

module.exports = connectToMongo;
