import React, { ReactElement, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../Context/authContext';

interface ProtectRouteProps {
	children: ReactElement;
}

const ProtectRoute: React.FC<ProtectRouteProps> = ({ children }) => {
	const { isAuthenticated, isLoading, checkAuthStatus } = useAuth();

	useEffect(() => {
		checkAuthStatus();
	}, [checkAuthStatus]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	return children;
};

export default ProtectRoute;
