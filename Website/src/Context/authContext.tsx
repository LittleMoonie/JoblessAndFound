import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	useCallback,
} from 'react';
import apiClient from '../API/apiClient';
import { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';

interface AuthContextType {
	isAuthenticated: boolean; // Indicates if the user is authenticated
	isLoading: boolean; // Indicates if the authentication check is in progress
	checkAuthStatus: () => Promise<void>; // Function to check authentication status
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const { data } = useQuery({
		queryKey: ['authenticationStatus'],
		queryFn: () => apiClient.authentication_status(),
	});


	const checkAuthStatus = useCallback(async () => {
		setIsLoading(true);
		try {
			const authStatus = await apiClient.authentication_status();


			// Ensure authStatus is defined and contains expected properties
			if (authStatus && typeof authStatus === 'object') {
				console.log('Auth Status Response:', authStatus);
				setIsAuthenticated(data?.isAuthenticated ?? false); // Update authentication state
				console.log(authStatus);
			} else {
				// Handle the case where authStatus is not as expected
				setIsAuthenticated(false);
				console.error('Auth status response is not valid:', authStatus);
			
			}
		} catch (error) {
			setIsAuthenticated(false); // Set as unauthenticated on error
			console.error('Authentication check failed:', error);
		} finally {
			setIsLoading(false); // Stop loading once the check is complete
		}
	}, []); // Empty dependency array ensures it only initializes once

	useEffect(() => {
		// Check auth status on mount
		checkAuthStatus();
	}, [checkAuthStatus]); // Ensure checkAuthStatus is a dependency

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, isLoading, checkAuthStatus }}
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
