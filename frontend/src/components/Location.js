import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Location = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const navigate = useNavigate();

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          calculateDistance(latitude, longitude);
          saveLocationToDatabase(latitude, longitude);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const saveLocationToDatabase = async (latitude, longitude) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User is not authenticated");
      }

      const userEmail = localStorage.getItem("email");

      const response = await fetch("http://localhost:5000/api/user/address/location", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userEmail, latitude, longitude }),
      });

      if (response.ok) {
        console.log("Location saved successfully");
      } else {
        throw new Error("Failed to save location");
      }
    } catch (error) {
      console.error("Error saving location:", error);
    }
  };

  const calculateDistance = (latitude, longitude) => {
    // Coordinates of your shop
    const shopLatitude = "12.88506";
    const shopLongitude = "77.5675924";

    // Haversine formula to calculate distance between two points
    const R = 6371; // Radius of the Earth in km
    const dLat = deg2rad(shopLatitude - latitude);
    const dLon = deg2rad(shopLongitude - longitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(latitude)) *
        Math.cos(deg2rad(shopLatitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km

    setDistance(distance);
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const handleOrder = () => {
    if (distance && distance <= 10) {
      // Proceed with order
      navigate("/payment");
    } else {
      // Reject order
      alert("Sorry, we can't deliver to your location.");
    }
  };

  return (
    <div>
      <button onClick={getLocation}>Get My Location</button>
      {userLocation && (
        <p>
          Your location: {userLocation.latitude}, {userLocation.longitude}
        </p>
      )}
      {distance && <p>Distance from shop: {distance.toFixed(2)} km</p>}
      <button onClick={handleOrder}>Place Order</button>
    </div>
  );
};

export default Location;
