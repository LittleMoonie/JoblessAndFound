import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/authContext';
import { useMutation } from '@tanstack/react-query';
import { Alert, Grid } from '@mui/material';
import ColorModeIconDropdown from '../Dashboard/ColorModeIconDropdown';
import AppTheme from '../AppTheme';

const Card = styled(MuiCard)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignSelf: 'center',
	width: '100%',
	padding: theme.spacing(4),
	gap: theme.spacing(2),
	margin: 'auto',
	[theme.breakpoints.up('sm')]: {
		maxWidth: '450px',
	},
	boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
	...theme.applyStyles('dark', {
		boxShadow: 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
	}),
}));

const LoginContainer = styled(Stack)(({ theme }) => ({
	minHeight: '100%',
	padding: theme.spacing(2),
	[theme.breakpoints.up('sm')]: {
		padding: theme.spacing(4),
	},
	'&::before': {
		content: '""',
		display: 'block',
		position: 'absolute',
		zIndex: -1,
		inset: 0,
		backgroundImage: 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
		backgroundRepeat: 'no-repeat',
		...theme.applyStyles('dark', {
			backgroundImage: 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
		}),
	},
}));

const Login: React.FC<{ disableCustomTheme?: boolean }> = (props) => {
	const { checkAuthStatus } = useAuth();
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);

	const loginMutation = useMutation({
		mutationFn: async () => {
			const response = await fetch('http://localhost:5000/api/Authentication/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
				credentials: 'include', 
			});

			if (!response.ok) {
				throw new Error('Login failed');
			}

			return response.json();
		},
		onSuccess: async () => {
			await checkAuthStatus(); 
			navigate('/home');
		},
		onError: (err: unknown) => {
			setError('Login failed. Please check your credentials.');
			console.error('Login failed:', err);
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		loginMutation.mutate();
	};

	return (
		<AppTheme {...props}>
			<CssBaseline enableColorScheme />
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					margin: '1%',
				}}
			>
				<Link
					href="/"
					variant="h6"
					sx={{
						display: 'flex',
						color: '#3E63DD',
						'&:hover': {
							color: '#004074',
						},
					}}
				>
					<ArrowBackIcon sx={{ paddingRight: '3px' }} /> Return home
				</Link>
				<ColorModeIconDropdown />
			</Box>

			<LoginContainer direction="column" justifyContent="space-between">
				<Card variant="outlined">
					<Typography
						component="h1"
						variant="h4"
						sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
					>
						Sign In
					</Typography>
					{error && (
						<Alert severity="error" sx={{ width: '100%', mb: 2 }}>
							{error}
						</Alert>
					)}
					{loginMutation.isSuccess && (
						<Alert severity="success" sx={{ width: '100%', mb: 2 }}>
							Logged in successfully
						</Alert>
					)}
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{
							display: 'flex',
							flexDirection: 'column',
							width: '100%',
							gap: 2,
						}}
					>
						<FormControl>
							<FormLabel htmlFor="email">Email</FormLabel>
							<TextField
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								id="email"
								type="email"
								name="email"
								placeholder="your@email.com"
								autoComplete="email"
								required
								fullWidth
								variant="outlined"
							/>
						</FormControl>

						<FormControl>
							<FormLabel htmlFor="password">Password</FormLabel>
							<TextField
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								name="password"
								placeholder="••••••"
								type="password"
								id="password"
								autoComplete="current-password"
								required
								fullWidth
								variant="outlined"
							/>
						</FormControl>

						<Button
							type="submit"
							fullWidth
							variant="contained"
						>
							Sign in
						</Button>
						<Grid container justifyContent="space-between">
							<Grid item>
								<Button variant="text" size="small" color="secondary">
									Forgot password?
								</Button>
							</Grid>
							<Grid item>
								<Button
									href="/register"
									variant="text"
									size="small"
									color="secondary"
								>
									{"Don't have an account? Sign Up"}
								</Button>
							</Grid>
						</Grid>
					</Box>
				</Card>
			</LoginContainer>
		</AppTheme>
	);
};

Login.displayName = 'Login';

export default Login;
