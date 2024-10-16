// src/Router/publicRoutes.tsx

import React from 'react';
import { RouteObject } from 'react-router-dom';
import LandingPage from '../Views/LandingPage';
import NotFoundPage from '../Views/NotFoundPage';
import LoginPage from '../Views/LoginPage';
import Register from '../Views/Register';
import HowToAddMyBusiness from '../Views/FooterLinks/addBusiness';
import GeneralConditions from '../Views/FooterLinks/cgu';
import LegalNotices from '../Views/FooterLinks/legalNotices';
import PrivacyPolicy from '../Views/FooterLinks/privacyPolicy';
import ProblemWithMyAccount from '../Views/FooterLinks/probAccount';
import ProblemWithMyBusiness from '../Views/FooterLinks/probBusiness';
// Import other public pages as needed

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
		path: '/register',
		element: <Register />,
	},
	{
		path: '/legal-notices',
		element: <LegalNotices />,
	},
	{
		path: '/privacy-policy',
		element: <PrivacyPolicy />,
	},
	{
		path: '/general-conditions',
		element: <GeneralConditions />,
	},
	{
		path: '/problem-with-my-account',
		element: <ProblemWithMyAccount />,
	},
	{
		path: '/problem-with-my-business',
		element: <ProblemWithMyBusiness />,
	},
	{
		path: '/how-to-add-my-business',
		element: <HowToAddMyBusiness />,
	},
	{
		path: '*',
		element: <NotFoundPage />,
	},
];

export default PublicRoutes;
