const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { faker } = require("@faker-js/faker");
const Restaurant = require("../models/Restaurant");
const connectDB = require("../config/db");

dotenv.config();

const CUISINES = [
  "Italian", "Chinese", "Indian", "Mexican", "Thai",
  "Japanese", "Korean", "French", "American", "Mediterranean"
];

const LOCATIONS = [
  "New York", "Los Angeles", "Chicago", "Houston", "Phoenix",
  "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"
];

const generateRestaurants = (count = 20000) => {
  const restaurants = [];

  for (let i = 0; i < count; i++) {
    restaurants.push({
      name: faker.company.name(),
      cuisine: faker.helpers.arrayElement(CUISINES),
      location: faker.helpers.arrayElement(LOCATIONS),
      rating: parseFloat((Math.random() * 4 + 1).toFixed(1)), // rating between 1.0 and 5.0
    });
  }

  return restaurants;
};

const seedRestaurants = async () => {
  try {
    await connectDB();
    console.log("Connected to DB");

    await Restaurant.deleteMany(); // Clear previous data
    console.log("Old data deleted");

    const restaurants = generateRestaurants();
    await Restaurant.insertMany(restaurants);

    console.log("✅ 20,000 Restaurants Seeded!");
    process.exit();
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

seedRestaurants();
