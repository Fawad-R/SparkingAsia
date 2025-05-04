const express = require("express");
const router = express.Router();
// getRestaurants,
const { filterRestaurants,getAllRestaurants } = require("../controllers/restaurantController");
const authenticate = require("../middleware/authMiddleware");

router.get("/protected", authenticate, (req, res) => {
    res.json({ message: "You are authenticated!", user: req.user });
});
// const {
//   getAllRestaurants,
//   filterRestaurants
// } = require("../controllers/restaurantController");

// Public: get all (paginated)
router.get("/", getAllRestaurants);

// Filtered search via POST body
router.post("/filter", filterRestaurants);

module.exports = router;
