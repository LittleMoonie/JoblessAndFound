import React from 'react';
import { RouteObject } from 'react-router-dom';
import AdminPage from '../Views/AdminPage';
import ManageUsers from '../Views/Admin/User/ManageUsers';
import ManageCompanies from '../Views/Admin/Company/ManageCompanies';
import VerifyCompanies from '../Views/Admin/Company/VerifyCompanies';
import ManageOffers from '../Views/Admin/Offer/ManageOffers';
import FlaggedOffers from '../Views/Admin/Offer/FlaggedOffers';
import ReportedOffers from '../Views/Admin/Offer/ReportedOffers';
import ManagePosts from '../Views/Admin/Posts/ManagePosts';
import FlaggedPosts from '../Views/Admin/Posts/FlaggedPosts';
import ReportedPosts from '../Views/Admin/Posts/ReportedPosts';
import ManageThemes from '../Views/Admin/Job/ManageThemes';
import AnalyticsDashboard from '../Views/Admin/Analytic/Analytics';
import ManageRoles from '../Views/Admin/Role/ManageRoles';
import ManageReports from '../Views/Admin/Report/ManageReports';
import ManageNotifications from '../Views/Admin/Notification/ManageNotification';

const AdminRoutes: RouteObject[] = [
	{
		path: 'admin',
		element: <AdminPage />,
		children: [
			{ path: 'users', element: <ManageUsers /> },
			{ path: 'companies', element: <ManageCompanies /> },
			{ path: 'verify-companies', element: <VerifyCompanies /> },
			{ path: 'offers', element: <ManageOffers /> },
			{ path: 'flagged-offers', element: <FlaggedOffers /> },
			{ path: 'reported-offers', element: <ReportedOffers /> },
			{ path: 'posts', element: <ManagePosts /> },
			{ path: 'flagged-posts', element: <FlaggedPosts /> },
			{ path: 'reported-posts', element: <ReportedPosts /> },
			{ path: 'themes', element: <ManageThemes /> },
			{ path: 'analytics', element: <AnalyticsDashboard /> },
			{ path: 'roles', element: <ManageRoles /> },
			{ path: 'reports', element: <ManageReports /> },
			{ path: 'notifications', element: <ManageNotifications /> },
		],
	},
];

export default AdminRoutes;
