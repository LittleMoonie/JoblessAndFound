// src/router.tsx

import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../Components/Dashboard/Dashboard';
import SignIn from '../Components/Authentication/SignIn';

const router = createBrowserRouter([
    {
        path: "/signin",
        element: <SignIn />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
    // Add other routes as necessary
]);

export default router;
