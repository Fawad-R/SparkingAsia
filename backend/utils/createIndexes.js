// scripts/createIndexes.js

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config(); // Load .env for MONGO_URI

const Restaurant = require("../models/Restaurant");

const createIndexes = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected");

    await Restaurant.createIndexes();
    console.log("Indexes created successfully");

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (err) {
    console.error("Error creating indexes:", err.message);
    process.exit(1);
  }
};

createIndexes();
