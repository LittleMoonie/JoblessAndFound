// src/Router/protectedRoutes.tsx

import React from 'react';
import { RouteObject } from 'react-router-dom';
import HomePage from '../Views/HomePage';
import OffersPage from '../Views/Offers';
import ProfilePage from '../Views/Profile';
import ModeratorPage from '../Views/ModeratorPage';
import AdminPage from '../Views/AdminPage';
import Settings from '../Views/Settings';
import Company from '../Views/Company';
import MessagesPage from '../Views/MessagesPage';

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
		path: 'company',
		element: <Company />,
	},
	{
		path: 'profile', 
		element: <ProfilePage />,
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
		path: 'messages',
		element: <MessagesPage />,
	},
	{
		path: 'admin',
		element: <AdminPage />,
	},
];

export default ProtectedRoutes;
