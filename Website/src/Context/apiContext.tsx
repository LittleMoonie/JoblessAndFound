import React, { createContext, useContext } from 'react';
import apiClientWrapper from '../apiClientWrapper';

interface ApiContextType {
  apiClient: typeof apiClientWrapper;
  fetchData: <T,>(apiCall: () => Promise<Response>) => Promise<{ result: T | null; error: string | null }>;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Use the wrapper as the apiClient
  const apiClient = apiClientWrapper;

  const fetchData = async <T,>(apiCall: () => Promise<Response>): Promise<{ result: T | null; error: string | null }> => {
    try {
      const response = await apiCall();
      if (response.ok) {
        // Parse JSON response if response is ok
        const jsonResponse: { result: T } = await response.json();

        // Automatically unwrap the result if the response has a 'result' key
        return { result: jsonResponse.result, error: null };
      } else {
        const errorText = await response.text();
        return { result: null, error: `Error: ${response.status} - ${errorText}` };
      }
    } catch (error) {
      console.error('API Error:', error);
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

export const useAPIClient = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useAPIClient must be used within an ApiProvider');
  }
  return context;
};
