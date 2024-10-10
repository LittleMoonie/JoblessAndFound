// src/Router/ProtectedRouter.tsx

import React from 'react';
import { useAuth } from '../Context/authContext';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouterProps {
	children: React.ReactNode; // Define children type to allow nested components
}

const ProtectedRouter: React.FC<ProtectedRouterProps> = ({ children }) => {
	const { isAuthenticated } = useAuth(); // Assume useAuth gives authentication state
	const location = useLocation();

	if (!isAuthenticated) {
		// Redirect to login page if user is not authenticated
		return <Navigate to='/login' state={{ from: location }} replace />;
	}

	return <>{children}</>;
};

export default ProtectedRouter;
