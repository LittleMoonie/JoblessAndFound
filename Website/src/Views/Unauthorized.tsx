import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Unauthorized: React.FC = () => {
	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate('/home');
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100vh',
				padding: '20px',
				textAlign: 'center',
				backgroundColor: '#f5f5f5',
			}}
		>
			<Typography variant='h2' color='error' gutterBottom>
				{'What are you doing here, mister?'}
			</Typography>

			<Typography variant='h6' gutterBottom>
				{
					"If you're an admin looking for the admin page and somehow ended up here, please contact your supervisor."
				}
			</Typography>

			<Typography variant='body1' gutterBottom>
				{'Otherwise, you better turn around now—this page isn’t for you!'}
			</Typography>

			<Button
				variant='contained'
				color='primary'
				sx={{ mt: 4 }}
				onClick={handleGoBack}
			>
				Go Back
			</Button>
		</Box>
	);
};

export default Unauthorized;
