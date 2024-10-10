// src/Router/ProtectedRoute.tsx
import React from 'react';
import { Navigate, RouteProps } from 'react-router-dom';
import { useAuth } from '../Context/authContext';

const ProtectedRoute: React.FC<RouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    // Render a loading indicator or null while checking auth status
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // If not authenticated, redirect to login
    return <Navigate to="/login" />;
  }

  // If authenticated, render the children elements
  return <>{children}</>;
};

export default ProtectedRoute;
