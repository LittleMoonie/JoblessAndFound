// src/Router/router.tsx
import React from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import SignInPage from '../Components/Authentication/SignIn';
import ProtectedRouter from './protectedroute';
import Dashboard from '../Components/Dashboard/Dashboard';
import HomePage from '../Views/Home';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <SignInPage />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRouter>
        <Dashboard />
      </ProtectedRouter>
    ),
  },
];

const router = createBrowserRouter(routes);

export default router;
