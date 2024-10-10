// src/Router/index.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import ProtectedRoutes from './ProtectedRoutes';
import ProtectedRoute from './ProtectedRoute'; // Your protected route wrapper, if applicable
import Layout from '../Layout/Layout';
import LandingPage from '../Views/LandingPage';
import NotFoundPage from '../Views/NotFoundPage'; // Import your components

const AppRouter: React.FC = () => {
	return (
		<Router>
			<Routes>
				{/* Public Routes */}
				<Route path='/' element={<LandingPage />} />

				{/* All protected routes will be children of Layout */}
				<Route
					path='/'
					element={
						<ProtectedRoute>
							{' '}
							{/* Ensure ProtectedRoute is properly configured */}
							<Layout />
						</ProtectedRoute>
					}
				>
					{/* Map over all protected routes and add them as children */}
					{ProtectedRoutes.map((route) => (
						<Route key={route.path} path={route.path} element={route.element} />
					))}
				</Route>

				{/* Catch-all Route for Not Found */}
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		</Router>
	);
};

export default AppRouter;
