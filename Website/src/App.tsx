// src/App.tsx
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRouter from './Router/Routes'; // Use AppRouter instead of custom router
import { AuthProvider } from './Context/authContext';
import { LoadingProvider } from './Context/loadingContext';

const theme = createTheme({});
const queryClient = new QueryClient();

const App: React.FC = () => {
	return (
		<React.StrictMode>
			<QueryClientProvider client={queryClient}>
				<LoadingProvider>
					<AuthProvider>
						<ThemeProvider theme={theme}>
							<AppRouter />
						</ThemeProvider>
					</AuthProvider>
				</LoadingProvider>
			</QueryClientProvider>
		</React.StrictMode>
	);
};

export default App;
