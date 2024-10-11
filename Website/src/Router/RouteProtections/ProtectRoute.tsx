import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../Context/authContext';

interface ProtectRouteProps {
	children: ReactElement;
}

const ProtectRoute: React.FC<ProtectRouteProps> = ({ children }) => {
	const { isAuthenticated, isLoading } = useAuth();

	console.log('ProtectRoute - isAuthenticated:', isAuthenticated);
	console.log('ProtectRoute - isLoading:', isLoading);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!isAuthenticated) {
		console.log('Redirecting to /login...');
		return <Navigate to='/login' replace />;
	}

	return children;
};

export default ProtectRoute;
