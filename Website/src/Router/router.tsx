// src/Router/router.tsx
import React from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import SignInPage from '../Components/Authentication/SignIn';
import ProtectedRouter from './protectedroute';
import Dashboard from '../Components/Dashboard/Dashboard';
import HomePage from '../Views/Home';
import LandingPage from '../Views/LandingPage';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <SignInPage />,
  },
  {
    path: '/home',
    element: <HomePage />,
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
