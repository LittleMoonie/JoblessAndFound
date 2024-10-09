// src/App.tsx

import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Container, createTheme, ThemeProvider } from '@mui/material';
import router from './Router/router';
import { AuthProvider } from './Context/authContext';

const theme = createTheme();

const App: React.FC = () => {
	return (
		<AuthProvider>
			<ThemeProvider theme={theme}>
				<Container maxWidth='sm'>
					<RouterProvider router={router} />
				</Container>
			</ThemeProvider>
		</AuthProvider>
	);
};

export default App;
