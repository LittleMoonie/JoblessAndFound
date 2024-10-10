// src/Router/publicRoutes.tsx

import React from 'react';
import { RouteObject } from 'react-router-dom';
import LandingPage from '../Views/LandingPage';
import NotFoundPage from '../Views/NotFoundPage';
import LoginPage from '../Views/LoginPage';
// Import other public pages as needed

const publicRoutes: RouteObject[] = [
	{
		path: '/',
		element: <LandingPage />,
	},
	{
		path: '/login',
		element: <LoginPage />,
	},
	// Add more public routes here
	{
		path: '*',
		element: <NotFoundPage />,
	},
];

export default publicRoutes;
