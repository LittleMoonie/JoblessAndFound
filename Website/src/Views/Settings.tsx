import React from 'react';
import ConstructionIcon from '@mui/icons-material/Construction';
import { Box, Typography } from '@mui/material';

function Settings() {
	return (
		<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
			<ConstructionIcon />
			<Typography variant='h3'>Currently under construction</Typography>
		</Box>
	);
}

export default Settings;
