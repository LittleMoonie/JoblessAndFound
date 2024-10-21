import React, { useState } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	IconButton,
	Typography,
	Box,
	Pagination,
	Stack,
	Button,
} from '@mui/material';
import {
	ArrowBack as ArrowBackIcon,
	Delete as DeleteIcon,
	MarkEmailRead as MarkReadIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ManageNotifications = () => {
	const navigate = useNavigate();

	// Hardcoded notifications data
	const notifications = [
		{
			id: 1,
			message: 'New job offer available',
			user: 'User A',
			status: 'Unread',
		},
		{
			id: 2,
			message: 'Your post has been approved',
			user: 'User B',
			status: 'Read',
		},
		{
			id: 3,
			message: 'Company verification required',
			user: 'User C',
			status: 'Unread',
		},
	];

	const [page, setPage] = useState(1);
	const rowsPerPage = 10;

	// Pagination logic
	const handleChangePage = (
		event: React.ChangeEvent<unknown>,
		newPage: number
	) => {
		setPage(newPage);
	};

	// Get paginated notifications
	const paginatedNotifications = notifications.slice(
		(page - 1) * rowsPerPage,
		page * rowsPerPage
	);

	return (
		<Box sx={{ p: 4 }}>
			{/* Back Button */}
			<Button
				startIcon={<ArrowBackIcon />}
				variant='contained'
				onClick={() => navigate('/admin')}
				sx={{ mb: 2 }}
			>
				Back to Admin Dashboard
			</Button>

			{/* Page Header */}
			<Typography variant='h4' gutterBottom>
				Manage Notifications
			</Typography>

			{/* Notifications Table */}
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell>Message</TableCell>
							<TableCell>User</TableCell>
							<TableCell>Status</TableCell>
							<TableCell align='center'>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{paginatedNotifications.length > 0 ? (
							paginatedNotifications.map((notification) => (
								<TableRow key={notification.id}>
									<TableCell>{notification.id}</TableCell>
									<TableCell>{notification.message}</TableCell>
									<TableCell>{notification.user}</TableCell>
									<TableCell>{notification.status}</TableCell>
									<TableCell align='center'>
										{/* Mark as Read or Delete Notification */}
										{notification.status === 'Unread' && (
											<IconButton color='primary' aria-label='mark as read'>
												<MarkReadIcon />
											</IconButton>
										)}
										<IconButton color='error' aria-label='delete notification'>
											<DeleteIcon />
										</IconButton>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={5} align='center'>
									No notifications found
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>

			{/* Pagination */}
			<Stack spacing={2} sx={{ mt: 3, alignItems: 'center' }}>
				<Pagination
					count={Math.ceil(notifications.length / rowsPerPage)}
					page={page}
					onChange={handleChangePage}
					color='primary'
				/>
			</Stack>
		</Box>
	);
};

export default ManageNotifications;
