const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true, // supports partial search
  },
  cuisine: {
    type: String,
    required: true,
    index: true, // for filtering
  },
  location: {
    type: String,
    required: true,
    index: true, // for filtering
  },
  rating: {
    type: Number,
    required: true,
    index: true, // for range queries
  },
});

// Optional: Full text index (if you want more advanced search)
RestaurantSchema.index({ name: "text" });

module.exports = mongoose.model("Restaurant", RestaurantSchema);
