// src/Router/protectedRoutes.tsx

import React from 'react';
import { RouteObject } from 'react-router-dom';
import HomePage from '../Views/HomePage';
import OffersPage from '../Views/Offers';
import ProfilePage from '../Views/Profile';
import ModeratorPage from '../Views/ModeratorPage';
import AdminPage from '../Views/AdminPage';
import Business from '../Views/Business';
import Settings from '../Views/Settings';


const ProtectedRoutes: RouteObject[] = [
	{
		path: 'home',
		element: <HomePage />,
	},
	{
		path: 'offers',
		element: <OffersPage />,
	},
	{
		path: 'user', 
		element: <ProfilePage />,
	},
	{
		path: 'business', 
		element: <Business />,
	},
	{
		path: 'settings', 
		element: <Settings />,
	},
	{
		path: 'moderator',
		element: <ModeratorPage />,
	},
	{
		path: 'admin',
		element: <AdminPage />,
	},
];

export default ProtectedRoutes;
