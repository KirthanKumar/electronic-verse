import React, { useState } from "react";
import ProductItem from "./ProductItem";

const SearchProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (query) => {
    try {
      const response = await fetch(
        `http://localhost:5000/products/search?query=${query}`
      );
      if (!response.ok) {
        throw new Error("Failed to search products");
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  const handleChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  return (
    <div>
      <div className="container-fluid">
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            value={searchQuery}
            placeholder="Search Product"
            aria-label="Search"
            onChange={handleChange}
          />
        </form>
      </div>

      <div className="row container" style={{ margin: "0 auto" }}>
        {searchResults.map((product) => (
          <div className="col-md-4 mb-3 mt-5" key={product._id}>
            <ProductItem product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchProducts;
