// src/App.tsx
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ApiProvider } from './Context/apiContext';
import { AuthProvider } from './Context/authContext';
import AppRouter from './Router/Router'; // Use AppRouter instead of custom router

const theme = createTheme({});
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ApiProvider>
          <AuthProvider>
            <ThemeProvider theme={theme}>
              <AppRouter />
            </ThemeProvider>
          </AuthProvider>
        </ApiProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
