import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // VERY IMPORTANT
});

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const logoutUser = () => API.post("/logout");
export const checkAuth = () => API.get("/restaurants/protected"); // test route
export const fetchRestaurants = () => API.get("/restaurants/getAll"); // test route
// export const fetchRestaurants = async (params) => {
//     return await axios.get("/api/restaurants/getAll", { params, withCredentials: true });
//   };
// export const fetchRestaurants = async (params) => {
//     return await axios.get("/api/restaurants/getAll", { params, withCredentials: true });
//   };
