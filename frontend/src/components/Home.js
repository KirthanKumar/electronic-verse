import React from "react";
import Corousel from "./Corousel";
import Products from "./Products";

export default function Home(props) {
  const { selectedCategory, selectedPriceFilter } = props;
  return (
    <>
      <Corousel />
      <Products category={selectedCategory} sort={selectedPriceFilter} />
    </>
  );
}
