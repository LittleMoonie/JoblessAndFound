// src/App.tsx

import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ApiProvider } from './Context/apiContext';
import { AuthProvider } from './Context/authContext';
import router from './Router/router';
import { RouterProvider } from 'react-router-dom';

const theme = createTheme();
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ApiProvider>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
          </ThemeProvider>
        </AuthProvider>
      </ApiProvider>
    </QueryClientProvider>
  );
};

export default App;
