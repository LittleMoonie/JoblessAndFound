import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { CircularProgress, Box } from '@mui/material';

interface LoadingContextProps {
  showLoading: () => void;
  hideLoading: () => void;
}

const LoadingContext = createContext<LoadingContextProps | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const showLoading = useCallback(() => setLoading(true), []);


  const hideLoading = useCallback(() => setLoading(false), []);

  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading }}>
      {children}
      {loading && <LoadingSpinner />} 
    </LoadingContext.Provider>
  );
};

export const useLoading = (): ((show: boolean) => void) => {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }

  const { showLoading, hideLoading } = context;

  return (show: boolean) => {
    if (show) {
      showLoading();
    } else {
      hideLoading();
    }
  };
};

const LoadingSpinner = () => (
  <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1300, 
    }}
  >
    <CircularProgress size={70} color="primary" />
  </Box>
);
