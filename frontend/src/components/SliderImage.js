import React, { useState, useEffect } from "react";

function CategoryImage(props) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchImage = async () => {
      const response = await fetch(
        `https://source.unsplash.com/${screenWidth}x400/?${props.category}`
        //   `https://source.unsplash.com/${screenWidth}x400/?${props.category},electronics&orientation=landscape&featured`
      );
      const url = response.url;
      setImageUrl(url);
    };

    fetchImage();
  }, [props.category, screenWidth]);

  return (
    <div>
      <img src={imageUrl} alt={`${props.category}`} className="d-block" />
    </div>
  );
}

export default CategoryImage;
