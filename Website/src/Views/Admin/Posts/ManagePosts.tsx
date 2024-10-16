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

const ManagePosts = () => {
	const navigate = useNavigate();

	// Hardcoded posts data
	const posts = [
		{
			id: 1,
			title: 'How to Improve SEO',
			author: 'John Doe',
			date: '2023-10-01',
		},
		{
			id: 2,
			title: 'React vs Angular',
			author: 'Jane Smith',
			date: '2023-09-25',
		},
		{
			id: 3,
			title: 'The Future of AI',
			author: 'Michael Johnson',
			date: '2023-09-15',
		},
		{
			id: 4,
			title: 'Best Web Development Practices',
			author: 'Emily Davis',
			date: '2023-09-10',
		},
		{
			id: 5,
			title: 'Marketing Strategies for 2024',
			author: 'David Miller',
			date: '2023-09-05',
		},
	];

	const [page, setPage] = useState(1);
	const rowsPerPage = 10;
	const [searchTerm, setSearchTerm] = useState('');

	// Search filter
	const filteredPosts = posts.filter(
		(post) =>
			post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			post.author.toLowerCase().includes(searchTerm.toLowerCase())
	);

	// Pagination logic
	const handleChangePage = (
		event: React.ChangeEvent<unknown>,
		newPage: number
	) => {
		setPage(newPage);
	};

	// Get paginated posts based on search results
	const paginatedPosts = filteredPosts.slice(
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
				Manage Posts
			</Typography>

			{/* Search Input */}
			<TextField
				label='Search Posts'
				variant='outlined'
				fullWidth
				sx={{ mb: 3 }}
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				placeholder='Search by Title or Author'
			/>

			{/* Posts Table */}
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell>Title</TableCell>
							<TableCell>Author</TableCell>
							<TableCell>Date</TableCell>
							<TableCell align='center'>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{paginatedPosts.length > 0 ? (
							paginatedPosts.map((post) => (
								<TableRow key={post.id}>
									<TableCell>{post.id}</TableCell>
									<TableCell>{post.title}</TableCell>
									<TableCell>{post.author}</TableCell>
									<TableCell>{post.date}</TableCell>
									<TableCell align='center'>
										<IconButton color='primary' aria-label='add post'>
											<AddIcon />
										</IconButton>
										<IconButton color='secondary' aria-label='edit post'>
											<EditIcon />
										</IconButton>
										<IconButton color='error' aria-label='delete post'>
											<DeleteIcon />
										</IconButton>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={5} align='center'>
									No posts found
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>

			{/* Pagination */}
			<Stack spacing={2} sx={{ mt: 3, alignItems: 'center' }}>
				<Pagination
					count={Math.ceil(filteredPosts.length / rowsPerPage)}
					page={page}
					onChange={handleChangePage}
					color='primary'
				/>
			</Stack>
		</Box>
	);
};

export default ManagePosts;
