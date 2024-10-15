import React, { ReactElement, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../Context/authContext';

interface ProtectRouteProps {
	children: ReactElement;
}

const ProtectRoute: React.FC<ProtectRouteProps> = ({ children }) => {
	const { isAuthenticated, isLoading, checkAuthStatus } = useAuth();

	useEffect(() => {
		const checkAuth = async () => {
			try {
				await checkAuthStatus();
			} catch (error) {
				console.error('Failed to check auth status:', error);
			}
		};

		checkAuth();
	}, [checkAuthStatus]);

	if (isLoading) {
		return <div>Loading...</div>; // Optionally show a loading indicator
	}

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />; // Redirect to login if not authenticated
	}

	return children; // Render the protected route's children
};

export default ProtectRoute;
