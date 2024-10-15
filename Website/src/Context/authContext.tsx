import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	useCallback,
} from 'react';
import apiClient from '../API/apiClient';
import { ReactNode } from 'react';

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

	// Fetch authentication status directly using an API call
	const checkAuthStatus = useCallback(async () => {
		setIsLoading(true);
		try {
			const authStatus = await apiClient.authentication_status();
			if (authStatus && typeof authStatus === 'object') {
				setIsAuthenticated(authStatus.isAuthenticated ?? false);
			} else {
				setIsAuthenticated(false);
				console.error('Auth status response is not valid:', authStatus);
			}
		} catch (error) {
			setIsAuthenticated(false); // Set as unauthenticated on error
			console.error('Authentication check failed:', error);
		} finally {
			setIsLoading(false); // Stop loading once the check is complete
		}
	}, []); // Removed dependency on useQuery data

	useEffect(() => {
		// Check auth status on mount
		checkAuthStatus();
	}, [checkAuthStatus]);

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
