import { Box } from '@mui/material';
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminLanding from '../Components/Admin/AdminLanding';

const AdminPage = () => {
	const location = useLocation();

	const isInSubPage = location.pathname !== '/admin';

	return (
		<Box sx={{ display: 'flex' }}>
			<Box component='main' sx={{ flexGrow: 1 }}>
				{isInSubPage ? <Outlet /> : <AdminLanding />}
			</Box>
		</Box>
	);
};

export default AdminPage;
