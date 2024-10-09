// src/Router/RouterContext.tsx

import React, { createContext, useContext, ReactNode } from 'react';
import { useAuth } from '../Context/authContext'; // Adjust the path as needed
import { Navigate, useLocation } from 'react-router-dom';

interface RouterContextProps {
	children: ReactNode; // Properly typing the children prop
}

const RouterContext = createContext<boolean | undefined>(undefined);

const RouterContextProvider: React.FC<RouterContextProps> = ({ children }) => {
	const { isAuthenticated } = useAuth();
	const location = useLocation();

	if (!isAuthenticated && location.pathname !== '/login') {
		return <Navigate to='/login' state={{ from: location }} replace />;
	}

	return <>{children}</>;
};

export const useRouterContext = () => {
	const context = useContext(RouterContext);
	if (context === undefined) {
		throw new Error(
			'useRouterContext must be used within a RouterContextProvider'
		);
	}
	return context;
};

export default RouterContextProvider;
