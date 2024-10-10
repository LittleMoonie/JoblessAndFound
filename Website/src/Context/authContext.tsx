import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAPIClient } from './apiContext';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { apiClient } = useAPIClient();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Initially set to true if we have a saved token
    return localStorage.getItem('token') !== null;
  });
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('token');
  });

  // Fetch user status with useQuery and directly handle authentication state
  const { data, isLoading } = useQuery({
    queryKey: ['authentication_status'],
    queryFn: () => apiClient.authentication_status(),
    enabled: !!token, // Only execute the query if the token exists
  });

  useEffect(() => {
    if (data) {
      setIsAuthenticated(true);
    }
  }, [data]);

  // Show a loading indicator while we're checking the user's authentication status
  useEffect(() => {
    if (isLoading) {
      // Optionally you could add a spinner here or some loading indicator state
      console.log("Checking authentication status...");
    }
  }, [isLoading]);

  // Simple logout function
  const logout = async () => {
    if (token) {
      try {
        await apiClient.authentication_logout();
        localStorage.removeItem('token');
        setToken(null);
        setIsAuthenticated(false);
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
