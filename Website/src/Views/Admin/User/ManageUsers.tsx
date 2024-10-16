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

const ManageUsers = () => {
	const navigate = useNavigate();

	// Hardcoded user data
	const users = [
		{
			id: 1,
			firstName: 'John',
			lastName: 'Doe',
			email: 'john.doe@example.com',
		},
		{
			id: 2,
			firstName: 'Jane',
			lastName: 'Smith',
			email: 'jane.smith@example.com',
		},
		{
			id: 3,
			firstName: 'Michael',
			lastName: 'Johnson',
			email: 'michael.johnson@example.com',
		},
		{
			id: 4,
			firstName: 'Emily',
			lastName: 'Davis',
			email: 'emily.davis@example.com',
		},
		{
			id: 5,
			firstName: 'David',
			lastName: 'Miller',
			email: 'david.miller@example.com',
		},
		{
			id: 6,
			firstName: 'Sarah',
			lastName: 'Brown',
			email: 'sarah.brown@example.com',
		},
		{
			id: 7,
			firstName: 'James',
			lastName: 'Wilson',
			email: 'james.wilson@example.com',
		},
		{
			id: 8,
			firstName: 'Linda',
			lastName: 'Moore',
			email: 'linda.moore@example.com',
		},
		{
			id: 9,
			firstName: 'William',
			lastName: 'Taylor',
			email: 'william.taylor@example.com',
		},
		{
			id: 10,
			firstName: 'Patricia',
			lastName: 'Anderson',
			email: 'patricia.anderson@example.com',
		},
		{
			id: 11,
			firstName: 'Christopher',
			lastName: 'Jackson',
			email: 'christopher.jackson@example.com',
		},
		{
			id: 12,
			firstName: 'Barbara',
			lastName: 'White',
			email: 'barbara.white@example.com',
		},
	];

	const [page, setPage] = useState(1);
	const rowsPerPage = 10;
	const [searchTerm, setSearchTerm] = useState('');

	// Search filter
	const filteredUsers = users.filter(
		(user) =>
			user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.email.toLowerCase().includes(searchTerm.toLowerCase())
	);

	// Pagination logic
	const handleChangePage = (
		event: React.ChangeEvent<unknown>,
		newPage: number
	) => {
		setPage(newPage);
	};

	// Get paginated users based on search results
	const paginatedUsers = filteredUsers.slice(
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
				Manage Users
			</Typography>

			{/* Search Input */}
			<TextField
				label='Search Users'
				variant='outlined'
				fullWidth
				sx={{ mb: 3 }}
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				placeholder='Search by First Name, Last Name, or Email'
			/>

			{/* Users Table */}
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell>First Name</TableCell>
							<TableCell>Last Name</TableCell>
							<TableCell>Email</TableCell>
							<TableCell align='center'>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{paginatedUsers.length > 0 ? (
							paginatedUsers.map((user) => (
								<TableRow key={user.id}>
									<TableCell>{user.id}</TableCell>
									<TableCell>{user.firstName}</TableCell>
									<TableCell>{user.lastName}</TableCell>
									<TableCell>{user.email}</TableCell>
									<TableCell align='center'>
										<IconButton color='primary' aria-label='add user'>
											<AddIcon />
										</IconButton>
										<IconButton color='secondary' aria-label='edit user'>
											<EditIcon />
										</IconButton>
										<IconButton color='error' aria-label='delete user'>
											<DeleteIcon />
										</IconButton>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={5} align='center'>
									No users found
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>

			{/* Pagination */}
			<Stack spacing={2} sx={{ mt: 3, alignItems: 'center' }}>
				<Pagination
					count={Math.ceil(filteredUsers.length / rowsPerPage)}
					page={page}
					onChange={handleChangePage}
					color='primary'
				/>
			</Stack>
		</Box>
	);
};

export default ManageUsers;
