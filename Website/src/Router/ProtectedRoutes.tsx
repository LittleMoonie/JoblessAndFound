// src/Router/protectedRoutes.tsx

import React from 'react';
import { RouteObject } from 'react-router-dom';
import HomePage from '../Views/HomePage';
import OffersPage from '../Views/Offers';
import ProfilePage from '../Views/Profile';
// Import other protected pages as needed

const protectedRoutes: RouteObject[] = [
	{
		path: '/home',
		element: <HomePage />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: 'offers',
				element: <OffersPage />,
			},
			{
				path: 'settings',
				element: <ProfilePage />,
			},
			// Add more nested protected routes here
		],
	},
	// Add more protected parent routes here if needed (e.g., /admin)
];

export default protectedRoutes;
