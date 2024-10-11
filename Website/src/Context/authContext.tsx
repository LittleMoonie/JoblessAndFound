// src/Context/authContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from './apiClient';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      setIsLoading(true);
      try {
        const user = await apiClient.authentication_status();
        if (user) {
          setIsAuthenticated(true); // User is authenticated
        } else {
          setIsAuthenticated(false); // User is not authenticated
        }
      } catch (error) {
        console.error('Failed to check authentication status:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false); // Set loading to false after checking
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    await apiClient.authentication_login(email, password);
    setIsAuthenticated(true); // Update authenticated state after successful login
  };

  const logout = () => {
    apiClient.authentication_logout();
    setIsAuthenticated(false); // Update state after logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
