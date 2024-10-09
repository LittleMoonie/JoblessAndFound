// src/router.tsx

import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Dashboard from '../Components/Dashboard/Dashboard';
import SignIn from '../Components/Authentication/SignIn';
import { useAuth } from '../Context/authContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/signin" replace />;
    }

    return <>{children}</>;
};

const router = createBrowserRouter([
    {
        path: "/signin",
        element: <SignIn />,
    },
    {
        path: "/dashboard",
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
    },
    // Add other routes as necessary
]);

export default router;
