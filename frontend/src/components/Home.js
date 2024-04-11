import React from "react";
import Corousel from "./Corousel";
import Products from "../Products";

export default function Home(props) {
  const { selectedCategory } = props;
  return (
    <>
      <Corousel />
      <Products category={selectedCategory} />
    </>
  );
}
