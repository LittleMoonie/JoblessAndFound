// Login.tsx
import React, { useState } from 'react';
import {
	Avatar,
	Button,
	Container,
	Grid,
	Paper,
	TextField,
	Typography,
	Box,
	useTheme,
	Alert,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/authContext';
import { useMutation } from '@tanstack/react-query';
import apiClient from '../../API/apiClient';

const StyledPaper = styled(Paper)`
	padding: ${({ theme }) => theme.spacing(6)};
	margin-top: ${({ theme }) => theme.spacing(8)};
	display: flex;
	flex-direction: column;
	align-items: center;
	border-radius: ${({ theme }) => theme.shape.borderRadius * 2}px;
	box-shadow: 5;
	background-color: ${({ theme }) => theme.palette.background.paper};
	transition:
		transform 0.3s,
		box-shadow 0.3s;
	&:hover {
		transform: translateY(-5px);
		box-shadow: 10;
	}
`;

const BackgroundBox = styled(Box)`
	min-height: 100vh;
	background: ${({ theme }) =>
		`linear-gradient(135deg, ${theme.palette.primary.light} 30%, ${theme.palette.primary.main} 90%)`};
	display: flex;
	justify-content: center;
	align-items: center;
	padding: ${({ theme }) => theme.spacing(3)};
`;

const StyledButton = styled(Button)`
	margin-top: ${({ theme }) => theme.spacing(3)};
	margin-bottom: ${({ theme }) => theme.spacing(2)};
	padding: ${({ theme }) => theme.spacing(1.5)};
	font-weight: bold;
	border-radius: 20px;
	box-shadow: 3;
	transition:
		background-color 0.3s,
		box-shadow 0.3s;
	&:hover {
		background-color: ${({ theme }) => theme.palette.primary.dark};
		box-shadow: 6;
	}
`;

const Login: React.FC = () => {
	const theme = useTheme();
	const { checkAuthStatus } = useAuth();
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);

	const loginMutation = useMutation({
		mutationFn: () => apiClient.authentication_login(email, password),
		onSuccess: async () => {
			await checkAuthStatus(); // Check authentication status after login
			console.log('Login successful, navigating to /home');
			navigate('/home'); // Navigate to /home
		},
		onError: (err: unknown) => {
			setError('Login failed. Please check your credentials.');
			console.error('Login failed:', err);
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		loginMutation.mutate(); // Trigger the login mutation
	};
	return (
		<BackgroundBox>
			<Container component='main' maxWidth='xs'>
				<StyledPaper elevation={6}>
					<Avatar sx={{ m: 1, bgcolor: theme.palette.secondary.main }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography
						component='h1'
						variant='h5'
						sx={{ mb: 2, fontWeight: 'bold' }}
					>
						Sign In
					</Typography>
					{error && (
						<Alert severity='error' sx={{ width: '100%', mb: 2 }}>
							{error}
						</Alert>
					)}
					{loginMutation.isSuccess && (
						<Alert severity='success' sx={{ width: '100%', mb: 2 }}>
							Logged in successfully
						</Alert>
					)}
					<Box
						component='form'
						onSubmit={handleSubmit}
						noValidate
						sx={{ width: '100%' }}
					>
						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							id='email'
							label='Email Address'
							name='email'
							autoComplete='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							InputProps={{
								style: { borderRadius: '10px' },
							}}
						/>
						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
							autoComplete='current-password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							InputProps={{
								style: { borderRadius: '10px' },
							}}
						/>
						<StyledButton
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
						>
							Sign In
						</StyledButton>
						<Grid container justifyContent='space-between'>
							<Grid item>
								<Button variant='text' size='small' color='secondary'>
									Forgot password?
								</Button>
							</Grid>
							<Grid item>
								<Button
									href='/register'
									variant='text'
									size='small'
									color='secondary'
								>
									{"Don't have an account? Sign Up"}
								</Button>
							</Grid>
						</Grid>
					</Box>
				</StyledPaper>
			</Container>
		</BackgroundBox>
	);
};

Login.displayName = 'Login';

export default Login;
