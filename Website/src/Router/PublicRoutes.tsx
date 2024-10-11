// src/Router/publicRoutes.tsx

import React from 'react';
import { RouteObject } from 'react-router-dom';
import LandingPage from '../Views/LandingPage';
import NotFoundPage from '../Views/NotFoundPage';
import LoginPage from '../Views/LoginPage';

const PublicRoutes: RouteObject[] = [
	{
		path: '/',
		element: <LandingPage />,
	},
	{
		path: 'login',
		element: <LoginPage />,
	},
	{
		path: '*',
		element: <NotFoundPage />,
	},
];

export default PublicRoutes;
