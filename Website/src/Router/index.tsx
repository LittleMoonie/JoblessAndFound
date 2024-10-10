// src/Router/index.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import publicRoutes from './PublicRoutes';
import protectedRoutes from './ProtectedRoutes';
import ProtectedRoute from './ProtectedRoute'; // Ensure you are importing ProtectedRoute correctly
import Layout from '../Layout/Layout';
import NotFoundPage from '../Views/NotFoundPage';

const AppRouter: React.FC = () => {
	return (
		<Router>
			<Routes>
				{/* Public Routes */}
				{publicRoutes.map((route, index) => (
					<Route key={index} path={route.path} element={route.element} />
				))}

				{/* Protected Routes Wrapped in Layout */}
				<Route
					path='/home' // Base path for all protected routes
					element={
						<ProtectedRoute>
							<Layout />
						</ProtectedRoute>
					}
				>
					{/* Define all child routes inside the Layout */}
					{protectedRoutes.map((route, index) => (
						<Route key={index} path={route.path} element={route.element} />
					))}
				</Route>

				{/* Catch-all Route for 404 */}
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		</Router>
	);
};

export default AppRouter;
