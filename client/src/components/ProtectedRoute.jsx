import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAuth } from "../services/api";

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(null); // null = loading, false = not auth, true = auth
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await checkAuth();
        setAuth(true);
      } catch {
        setAuth(false);
      } finally {
        setLoading(false);
      }
    };
    verifyAuth();
  }, []);

  if (loading) return <p>Loading...</p>;

  return auth ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
