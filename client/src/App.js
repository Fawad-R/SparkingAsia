import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import './App.css'
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <ProtectedRoute> */}
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
          } />
        {/* </ProtectedRoute> */}
      </Routes>
    </Router>
  );
}

export default App;
