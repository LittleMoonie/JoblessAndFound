import React, { createContext, useContext } from 'react';
import apiClient from '../API/apiClient';

interface ApiContextType {
	apiClient: typeof apiClient;
	fetchData: <T>(apiCall: (headers: HeadersInit) => Promise<Response>) => Promise<{ result: T | null; error: string | null }>;
}

const ApiContext = createContext<ApiContextType | null>(null);

export const useAPIClient = () => {
	const context = useContext(ApiContext);
	if (context === null) {
		throw new Error('useAPIClient must be used within an ApiProvider');
	}
	return context;
};

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const fetchData = async <T,>(apiCall: (headers: HeadersInit) => Promise<Response>): Promise<{ result: T | null; error: string | null }> => {
		try {
			const headers: HeadersInit = {
				'Content-Type': 'application/json',
			};

			const response = await apiCall(headers);

			if (response.ok) {
				if (response.status === 204) {
					return { result: null, error: null }; // No Content
				}
				const jsonResponse: T = await response.json();
				return { result: jsonResponse, error: null };
			} else if (response.status === 401) {
				return { result: null, error: 'Unauthorized' }; // Handle unauthorized
			} else {
				const errorText = await response.text();
				return { result: null, error: `Error: ${response.status} - ${errorText}` };
			}
		} catch (error) {
			if (error instanceof Error) {
				return { result: null, error: error.message };
			}
			return { result: null, error: 'Unknown error occurred' };
		}
	};

	return (
		<ApiContext.Provider value={{ apiClient, fetchData }}>
			{children}
		</ApiContext.Provider>
	);
};
