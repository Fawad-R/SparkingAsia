import React from "react";

const RestaurantCard = ({ restaurant }) => {
  console.log('restaurant')
  return (
    <div className="restaurant-card">
      <h3>{restaurant.name}</h3>
      <p><strong>Cuisine:</strong> {restaurant.cuisine}</p>
      <p><strong>Location:</strong> {restaurant.location}</p>
      <p><strong>Rating:</strong> {restaurant.rating}</p>
    </div>
  );
};

export default RestaurantCard;
