// src/Router/protectedRoutes.tsx

import React from 'react';
import { RouteObject } from 'react-router-dom';
import HomePage from '../Views/HomePage';
import OffersPage from '../Views/Offers';
import ProfilePage from '../Views/Profile';
import ModeratorPage from '../Views/ModeratorPage';
import AdminPage from '../Views/AdminPage';

const protectedRoutes: RouteObject[] = [
	{
		path: 'home', // Relative path for /home
		element: <HomePage />,
	},
	{
		path: 'analytics', // Relative path for /analytics
		element: <OffersPage />,
	},
	{
		path: 'settings', // Relative path for /settings
		element: <ProfilePage />,
	},
	{
		path: 'moderator', // Relative path for /moderator
		element: <ModeratorPage />,
	},
	{
		path: 'admin', // Relative path for /admin
		element: <AdminPage />,
	},
];

export default protectedRoutes;
