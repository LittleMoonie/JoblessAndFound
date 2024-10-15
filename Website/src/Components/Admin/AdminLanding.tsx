import React from 'react';
import { Box, Typography } from '@mui/material';

const AdminLanding = () => {
	const IsAdmin = true;
	return (
		<Box>
			{IsAdmin != null ? (
				<Typography>{"You're an admin"}</Typography>
			) : (
				<Typography>{"You're not an admin"}</Typography>
			)}
		</Box>
	);
};

export default AdminLanding;
