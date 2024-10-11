// src/Router/protectedRoutes.tsx

import React from 'react';
import { RouteObject } from 'react-router-dom';
import AdminPage from '../Views/AdminPage';

const AdminRoutes: RouteObject[] = [
	{
		path: 'admin',
		element: <AdminPage />,
        children: [
            {
                path: 'company',
            },
            {
                path: 'user'
            },
            {
                path: 'moderator'
            },
        ],
	},
];

export default AdminRoutes;
