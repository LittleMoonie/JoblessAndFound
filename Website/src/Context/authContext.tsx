// src/Context/authContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAPIClient } from './apiContext';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any; // Replace `any` with your user type if defined
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { apiClient } = useAPIClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [user, setUser] = useState<any>(null);

  // Check authentication status when the component mounts
  useEffect(() => {
    const checkAuthStatus = async () => {
      setIsLoading(true); // Set loading to true while checking auth status
      try {
        const response = await apiClient.authentication_status();
        if (response) {
          setIsAuthenticated(true);
          setUser(response);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      }
      setIsLoading(false); // Set loading to false after checking auth status
    };

    checkAuthStatus();
  }, [apiClient]);

  const login = async (email: string, password: string) => {
    try {
      await apiClient.authentication_login(email, password);
      const response = await apiClient.authentication_status();
      if (response) {
        setIsAuthenticated(true);
        setUser(response);
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const logout = async () => {
    await apiClient.authentication_logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout }}>
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
