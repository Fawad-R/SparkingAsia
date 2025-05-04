import React, { useEffect, useState } from "react";
import "../style/Home.css";
import RestaurantCard from "../components/RestaurantCard";
import axios from "axios";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const limit = 10;

  const getData = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/restaurants/filter",
        {
          search,
          cuisine,
          location,
          rating,
          page: pageNumber,
          limit,
        },
        { withCredentials: true }
      );

      setRestaurants(res.data.data);
      setTotalPages(res.data.pagination.totalPages);
    } catch (err) {
      console.error("Failed to fetch restaurants", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    getData(1);
  };

  useEffect(() => {
    getData(page);
  }, [page]);

  const paginationRange = () => {
    const totalNumbers = 5;
    const totalBlocks = totalNumbers + 2;

    if (totalPages <= totalBlocks) {
      return [...Array(totalPages).keys()].map((i) => i + 1);
    }

    const startPage = Math.max(2, page - 2);
    const endPage = Math.min(totalPages - 1, page + 2);
    const pages = [];

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (startPage > 2) pages.unshift("...");
    if (endPage < totalPages - 1) pages.push("...");

    return [1, ...pages, totalPages];
  };

  return (
    <div className="home-wrapper">
      {loading && <div className="loader">Loading...</div>}

      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search restaurants..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
          <option value="">All Cuisines</option>
          <option value="Italian">Italian</option>
          <option value="Indian">Indian</option>
          <option value="Chinese">Chinese</option>
          <option value="Mexican">Mexican</option>
        </select>
        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="">All Locations</option>
          <option value="New York">New York</option>
          <option value="San Francisco">San Francisco</option>
          <option value="Chicago">Chicago</option>
          <option value="Houston">Houston</option>
        </select>
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="">All Ratings</option>
          <option value="5">5 Star</option>
          <option value="4">4 Star & up</option>
          <option value="3">3 Star & up</option>
        </select>
        <button type="submit">Search</button>
      </form>

      <div className="restaurant-list">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant._id} restaurant={restaurant} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => {
              if (page > 1) {
                setPage(page - 1);
              }
            }}
            disabled={page === 1}
          >
            Prev
          </button>

          {paginationRange().map((p, i) =>
            p === "..." ? (
              <span key={i}>...</span>
            ) : (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={page === p ? "active" : ""}
              >
                {p}
              </button>
            )
          )}

          <button
            onClick={() => {
              if (page < totalPages) {
                setPage(page + 1);
              }
            }}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
