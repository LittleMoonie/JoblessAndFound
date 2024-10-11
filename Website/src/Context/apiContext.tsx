// apiContext.tsx
import React, { createContext, useContext } from 'react';
import apiClientWrapper from './apiClient';

interface ApiContextType {
	apiClient: typeof apiClientWrapper;
}

const ApiContext = createContext<ApiContextType | null>(null);

export const useAPIClient = () => {
	const context = useContext(ApiContext);
	if (context === null) {
		throw new Error('useAPIClient must be used within an ApiProvider');
	}
	return context;
};

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const apiClient = apiClientWrapper;

	const fetchData = async <T,>(
		apiCall: (headers: HeadersInit) => Promise<Response>
	): Promise<{ result: T | null; error: string | null }> => {
		try {
			const headers: HeadersInit = {
				'Content-Type': 'application/json',
			};

			console.log('Calling API with headers:', headers);

			const response = await apiCall(headers);

			if (response.ok) {
				if (response.status === 204) {
					// No Content
					return { result: null, error: null };
				}
				const jsonResponse: T = await response.json();
				return { result: jsonResponse, error: null };
			} else if (response.status === 401) {
				// Unauthorized, possibly redirect to login
				return { result: null, error: 'Unauthorized' };
			} else {
				const errorText = await response.text();
				console.error(`API Error: ${response.status} - ${errorText}`);
				return {
					result: null,
					error: `Error: ${response.status} - ${errorText}`,
				};
			}
		} catch (error) {
			console.error('API Error (catch block):', error);
			if (error instanceof Error) {
				return { result: null, error: error.message };
			}
			return { result: null, error: 'Unknown error occurred' };
		}
	};

	return (
		<ApiContext.Provider value={{ apiClient }}>{children}</ApiContext.Provider>
	);
};
