// src/Router/index.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import ProtectedRoute from './RouteProtections/ProtectRoute';
import AdminRoutes from './AdminRoutes';
import Layout from '../Layout/Layout';
import PublicRoutes from './PublicRoutes';

const AppRouter: React.FC = () => {
	return (
		<Router>
			<Routes>
				{PublicRoutes.map((route) => (
					<Route key={route.path} path={route.path} element={route.element} />
				))}

				<Route
					path='/'
					element={
						<ProtectedRoute>
							<Layout />
						</ProtectedRoute>
					}
				>
					{ProtectedRoutes.map((route) => (
						<Route key={route.path} path={route.path} element={route.element} />
					))}

					<Route path='/'>
						{AdminRoutes.map((route) => (
							<Route key={route.path} path={route.path} element={route.element}>
								{route.children?.map((child) => (
									<Route
										key={child.path}
										path={child.path}
										element={child.element}
									/>
								))}
							</Route>
						))}
					</Route>
				</Route>
			</Routes>
		</Router>
	);
};

export default AppRouter;
