import React, { createContext, useContext, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';

interface AuthContextType {
	isAuthenticated: boolean;
	isLoading: boolean;
	checkAuthStatus: () => void;
	userFirstName: string | null;
	userLastName: string | null;
	userEmail: string | null;
	userId: number | null;
	userTypeId: number | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
	children: ReactNode;
}

// Update fetchAuthStatus to handle the new structure of the response
const fetchAuthStatus = async (): Promise<{
	isAuthenticated: boolean;
	userFirstName: string;
	userLastName: string;
	userEmail: string;
	userId: number;
	userTypeId: number;
}> => {
	const response = await fetch('http://localhost:5000/api/Authentication/status', {
		credentials: 'include',
	});
	if (!response.ok) {
		throw new Error('Failed to fetch authentication status');
	}
	const data = await response.json();

	if (
		typeof data !== 'object' ||
		data.isAuthenticated === undefined ||
		!data.user ||
		!data.user.firstName ||
		!data.user.lastName ||
		!data.user.email ||
		!data.user.userId ||
		!data.user.userTypeId
	) {
		throw new Error('Invalid response structure');
	}

	return {
		isAuthenticated: data.isAuthenticated,
		userFirstName: data.user.firstName,
		userLastName: data.user.lastName,
		userEmail: data.user.email,
		userId: data.user.userId,
		userTypeId: data.user.userTypeId,
	};
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	// Use react-query to manage the auth status and fetch user info
	const { data, isLoading, refetch } = useQuery({
		queryKey: ['authStatus'],
		queryFn: fetchAuthStatus,
	});

	const isAuthenticated = data?.isAuthenticated ?? false;
	const userFirstName = data?.userFirstName ?? null;
	const userLastName = data?.userLastName ?? null;
	const userEmail = data?.userEmail ?? null;
	const userId = data?.userId ?? null;
	const userTypeId = data?.userTypeId ?? null;

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				isLoading,
				checkAuthStatus: refetch,
				userFirstName,
				userLastName,
				userEmail,
				userId,
				userTypeId,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
