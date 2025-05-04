const Restaurant = require("../models/Restaurant");

exports.getAllRestaurants = async (req, res) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page)  || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 10);
    const skip  = (page - 1) * limit;

    // Total count (for frontend to compute total pages)
    const totalResults = await Restaurant.countDocuments();

    const restaurants = await Restaurant
      .find({})
      .skip(skip)
      .limit(limit)
      .lean(); // lean() for faster read

    return res.json({
      data: restaurants,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(totalResults / limit),
        totalResults
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.filterRestaurants = async (req, res) => {
  try {
    const {
      search   = "",
      cuisine  = "",
      location = "",
      rating   = 0,
      page     = 1,
      limit    = 10
    } = req.body;

    const pageNum = Math.max(1, parseInt(page));
    const lim     = Math.max(1, parseInt(limit));
    const skip    = (pageNum - 1) * lim;

    // Build query object
    const query = {};
    if (search.trim())   query.name     = { $regex: search,   $options: "i" };
    if (cuisine)         query.cuisine  = cuisine;
    if (location)        query.location = location;
    if (rating > 0)      query.rating   = { $gte: Number(rating) };

    const totalResults = await Restaurant.countDocuments(query);

    const restaurants = await Restaurant
      .find(query)
      .skip(skip)
      .limit(lim)
      .lean();

    return res.json({
      data: restaurants,
      pagination: {
        page: pageNum,
        limit: lim,
        totalPages: Math.ceil(totalResults / lim),
        totalResults
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
