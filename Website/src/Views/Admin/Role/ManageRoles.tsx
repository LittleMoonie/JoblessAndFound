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
	TextField,
	Button,
} from '@mui/material';
import {
	Add as AddIcon,
	Edit as EditIcon,
	Delete as DeleteIcon,
	ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ManageRoles = () => {
	const navigate = useNavigate();

	// Hardcoded roles data
	const roles = [
		{ id: 1, roleName: 'Admin', description: 'Full access to all features.' },
		{
			id: 2,
			roleName: 'Moderator',
			description: 'Can manage posts and users.',
		},
		{ id: 3, roleName: 'User', description: 'Basic user access.' },
		{
			id: 4,
			roleName: 'Employer',
			description: 'Can post jobs and manage company profiles.',
		},
	];

	const [page, setPage] = useState(1);
	const rowsPerPage = 10;
	const [searchTerm, setSearchTerm] = useState('');

	// Search filter
	const filteredRoles = roles.filter(
		(role) =>
			role.roleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			role.description.toLowerCase().includes(searchTerm.toLowerCase())
	);

	// Pagination logic
	const handleChangePage = (
		event: React.ChangeEvent<unknown>,
		newPage: number
	) => {
		setPage(newPage);
	};

	// Get paginated roles based on search results
	const paginatedRoles = filteredRoles.slice(
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
				Manage User Roles
			</Typography>

			{/* Search Input */}
			<TextField
				label='Search Roles'
				variant='outlined'
				fullWidth
				sx={{ mb: 3 }}
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				placeholder='Search by Role Name or Description'
			/>

			{/* Roles Table */}
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell>Role Name</TableCell>
							<TableCell>Description</TableCell>
							<TableCell align='center'>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{paginatedRoles.length > 0 ? (
							paginatedRoles.map((role) => (
								<TableRow key={role.id}>
									<TableCell>{role.id}</TableCell>
									<TableCell>{role.roleName}</TableCell>
									<TableCell>{role.description}</TableCell>
									<TableCell align='center'>
										<IconButton color='primary' aria-label='add role'>
											<AddIcon />
										</IconButton>
										<IconButton color='secondary' aria-label='edit role'>
											<EditIcon />
										</IconButton>
										<IconButton color='error' aria-label='delete role'>
											<DeleteIcon />
										</IconButton>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={4} align='center'>
									No roles found
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>

			{/* Pagination */}
			<Stack spacing={2} sx={{ mt: 3, alignItems: 'center' }}>
				<Pagination
					count={Math.ceil(filteredRoles.length / rowsPerPage)}
					page={page}
					onChange={handleChangePage}
					color='primary'
				/>
			</Stack>
		</Box>
	);
};

export default ManageRoles;
