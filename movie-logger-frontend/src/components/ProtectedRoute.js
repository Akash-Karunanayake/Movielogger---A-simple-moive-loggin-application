// src/components/ProtectedRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Store your JWT here after login

  if (!token) {
    // Redirect to login if no token is found
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
