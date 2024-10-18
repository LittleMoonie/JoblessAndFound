import React from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import ProtectedRoute from './RouteProtections/ProtectRoute';
import AdminRoute from './RouteProtections/AdminRoute';
import Layout from '../Layout/Layout';
import PublicRoutes from './PublicRoutes';
import { useAuth } from '../Context/authContext';
import ProtectedRoutes from './ProtectedRoutes';
import AdminRoutes, { AdminRoutePermissions } from './AdminRoutes';
import AdminPage from '../Views/AdminPage';

const AppRouter: React.FC = () => {
	const { userTypeId } = useAuth();

	const getFilteredAdminRoutes = () => {
		return AdminRoutes.map((route) => ({
			...route,

			element:
				route.requireduserTypeIds &&
				userTypeId !== null &&
				userTypeId >= Math.min(...route.requireduserTypeIds) ? (
					route.element
				) : (
					<Navigate to='/unauthorized' />
				),
			children: route.children?.filter(
				(child) =>
					child.path &&
					userTypeId !== null &&
					child.requireduserTypeIds &&
					Math.min(...child.requireduserTypeIds) <= userTypeId
			),
		}));
	};

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
					<Route
						path='/admin'
						element={
							<AdminRoute requireduserTypeIds={[3, 4]}>
								<React.Fragment>
									<AdminPage />{' '}
								</React.Fragment>
							</AdminRoute>
						}
					>
						{getFilteredAdminRoutes().map((route) => (
							<Route key={route.path} path={route.path} element={route.element}>
								{route.children?.map((child) =>
									child.path ? (
										<Route
											key={child.path}
											path={child.path}
											element={
												<AdminRoute
													requireduserTypeIds={[
														...AdminRoutePermissions[
															child.path as keyof typeof AdminRoutePermissions
														],
													]}
												>
													{/* Child components should not include Layout */}
													{child.element as React.ReactElement}
												</AdminRoute>
											}
										/>
									) : null
								)}
							</Route>
						))}
					</Route>
				</Route>
			</Routes>
		</Router>
	);
};

export default AppRouter;
