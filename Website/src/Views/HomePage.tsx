import React from 'react';
import MediaCard from '../Components/AdCards';
import { ApiProvider } from '../Context/apiContext';
import { Box, Typography } from '@mui/material';

function HomePage() {
	return (
		<Box>
			<Typography variant="h2">
				Pannel de control
			</Typography>
		</Box>
	);
}

export default HomePage;
