import React, { useState } from 'react';
import {
	Card,
	CardContent,
	Typography,
	IconButton,
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
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import UserModal from '../User/UserModal';

export interface UserData {
	userId: number;
	firstName: string;
	lastName: string;
	email: string;
	password?: string;
	countryCode: string;
	phoneNumber: string;
	userTypeId: number;
}

const fetchUsers = async (
	searchTerm: string,
	page: number,
	rowsPerPage: number
) => {
	const response = await fetch(
		`http://localhost:5000/api/User/GetAllUsers?searchTerm=${searchTerm}&page=${page}&pageSize=${rowsPerPage}`
	);
	if (!response.ok) {
		throw new Error('Error fetching users');
	}
	const result = await response.json();
	return {
		data: result.data,
		totalCount: result.totalCount,
	};
};

const ManageUsers = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const [page, setPage] = useState(1);
	const rowsPerPage = 3;
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
	const [openModal, setOpenModal] = useState(false);

	// Fetch users
	const { data: users, refetch } = useQuery({
		queryKey: ['users', page, searchTerm],
		queryFn: () => fetchUsers(searchTerm, page, rowsPerPage),
	});

	const totalPages = users ? Math.ceil(users.totalCount / rowsPerPage) : 0;

	// Add User API Call
	const addUserMutation = useMutation({
		mutationFn: async (userData: UserData) => {
			const url = `http://localhost:5000/api/User/AddUser?firstName=${userData.firstName}&lastName=${userData.lastName}&email=${userData.email}&password=${userData.password}&countryCode=${userData.countryCode}&phoneNumber=${userData.phoneNumber}&userTypeId=${userData.userTypeId}`;
			const response = await fetch(url, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(userData),
			});
			if (!response.ok) throw new Error('Failed to add user');
			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] });
			refetch();
		},
	});

	// Edit User API Call
	const editUserMutation = useMutation({
		mutationFn: async (userData: UserData) => {
			const url = `http://localhost:5000/api/User/UpdateUser?userId=${userData.userId}&firstName=${userData.firstName}&lastName=${userData.lastName}&email=${userData.email}&countryCode=${userData.countryCode}&phoneNumber=${userData.phoneNumber}&userTypeId=${userData.userTypeId}`;
			const response = await fetch(url, {
				method: 'POST',
			});
			if (!response.ok) throw new Error('Failed to update user');
			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] });
			refetch();
		},
	});

	// Delete User API Call
	const deleteUserMutation = useMutation({
		mutationFn: async (userId: number) => {
			const url = `http://localhost:5000/api/User/DeleteUser?userId=${userId}`;
			const response = await fetch(url, {
				method: 'POST', // Change this to POST for your API
			});
			if (!response.ok) throw new Error('Failed to delete user');
			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] });
			refetch();
		},
	});

	const handleDeleteUser = (userId: number) => {
		console.log('Deleting user with userId:', userId);
		deleteUserMutation.mutate(userId);
	};

	const handleSaveUser = (userData: {
		userId: number;
		firstName: string;
		lastName: string;
		email: string;
		countryCode: string;
		phoneNumber: string;
		userTypeId: number;
	}) => {
		if (selectedUser) {
			editUserMutation.mutate({ ...selectedUser, ...userData });
		} else {
			addUserMutation.mutate({ ...userData, userId: userData.userId ?? 0 });
		}
		setOpenModal(false);
		setSelectedUser(null);
	};

	const handleEditUser = (user: UserData) => {
		setSelectedUser(user);
		setOpenModal(true);
	};

	const handleChangePage = (
		event: React.ChangeEvent<unknown>,
		newPage: number
	) => {
		setPage(newPage);
	};

	return (
		<Box sx={{ p: 2 }}>
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
				sx={{ mb: 2 }}
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				placeholder='Search by First Name, Last Name, or Email'
			/>

			{/* Add User Button */}
			<Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
				<Button
					startIcon={<AddIcon />}
					variant='contained'
					color='primary'
					onClick={() => {
						setSelectedUser(null);
						setOpenModal(true);
					}}
				>
					Add User
				</Button>
			</Box>

			{/* User Cards */}
			{users?.data && users.data.length > 0 ? (
				users.data.map((user: UserData) => (
					<Card key={user.userId} sx={{ mb: 2, p: 2 }}>
						<CardContent>
							<Typography variant='h6'>
								{user.firstName} {user.lastName}
							</Typography>
							<Typography>Email: {user.email}</Typography>
							<Typography>Phone: {user.phoneNumber}</Typography>
							<Typography>
								Role:{' '}
								{user.userTypeId === 1
									? 'User'
									: user.userTypeId === 2
										? 'Recruiter'
										: user.userTypeId === 3
											? 'Moderator'
											: 'Admin'}
							</Typography>
							<Box sx={{ mt: 2 }}>
								<IconButton
									color='primary'
									aria-label='edit user'
									onClick={() => handleEditUser(user)}
								>
									<EditIcon />
								</IconButton>
								<IconButton
									color='error'
									aria-label='delete user'
									onClick={() => handleDeleteUser(user.userId)}
								>
									<DeleteIcon />
								</IconButton>
							</Box>
						</CardContent>
					</Card>
				))
			) : (
				<Typography>No users found</Typography>
			)}

			{/* Pagination */}
			<Stack spacing={2} sx={{ mt: 3, alignItems: 'center' }}>
				<Pagination
					count={totalPages}
					page={page}
					onChange={handleChangePage}
					color='primary'
				/>
			</Stack>

			{/* User Modal */}
			<UserModal
				open={openModal}
				onClose={() => setOpenModal(false)}
				onSave={handleSaveUser}
				initialData={selectedUser || undefined}
			/>
		</Box>
	);
};

export default ManageUsers;
