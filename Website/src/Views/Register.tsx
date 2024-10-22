import * as React from 'react';
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
import AppTheme from '../Components/AppTheme';
import Link from '@mui/material/Link';
import ColorModeIconDropdown from '../Components/Dashboard/ColorModeIconDropdown';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import PhoneInput from 'react-phone-number-input';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import 'react-phone-number-input/style.css';
import { useNavigate } from 'react-router-dom';

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
	boxShadow:
		'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
	...theme.applyStyles('dark', {
		boxShadow:
			'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
	}),
}));

const RegisterContainer = styled(Stack)(({ theme }) => ({
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
		backgroundImage:
			'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
		backgroundRepeat: 'no-repeat',
		...theme.applyStyles('dark', {
			backgroundImage:
				'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
		}),
	},
}));

export default function Register(props: { disableCustomTheme?: boolean }) {
	const queryClient = useQueryClient();
	const [emailError, setEmailError] = React.useState(false);
	const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
	const [passwordError, setPasswordError] = React.useState(false);
	const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
	const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
	const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
		React.useState('');
	const [fnameError, setFnameError] = React.useState(false);
	const [fnameErrorMessage, setFnameErrorMessage] = React.useState('');
	const [lnameError, setLnameError] = React.useState(false);
	const [lnameErrorMessage, setLnameErrorMessage] = React.useState('');
	const [phoneError, setPhoneError] = React.useState(false);
	const [phoneErrorMessage, setPhoneErrorMessage] = React.useState('');
	const [phoneValue, setPhoneValue] = React.useState<string | undefined>(
		undefined
	);

	const navigate = useNavigate();

	const addUserMutation = useMutation({
		mutationFn: async (userData: {
			firstName: string;
			lastName: string;
			email: string;
			password: string;
			countryCode: string;
			phoneNumber: string;
			userTypeId: number;
		}) => {
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
		},
	});

	const validateInputs = () => {
		const email = document.getElementById('email') as HTMLInputElement;
		const password = document.getElementById('password') as HTMLInputElement;
		const confirmPassword = document.getElementById(
			'confirm-password'
		) as HTMLInputElement;
		const fname = document.getElementById('fname') as HTMLInputElement;
		const lname = document.getElementById('lname') as HTMLInputElement;

		const passwordRegex =
			/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

		let isValid = true;

		// Validation du prénom
		if (!fname.value) {
			setFnameError(true);
			setFnameErrorMessage('First name is required.');
			isValid = false;
		} else {
			setFnameError(false);
			setFnameErrorMessage('');
		}

		// Validation du nom de famille
		if (!lname.value) {
			setLnameError(true);
			setLnameErrorMessage('Last name is required.');
			isValid = false;
		} else {
			setLnameError(false);
			setLnameErrorMessage('');
		}

		// Validation du numéro de téléphone
		if (!phoneValue || !parsePhoneNumberFromString(phoneValue)?.isValid()) {
			setPhoneError(true);
			setPhoneErrorMessage('Please enter a valid phone number.');
			isValid = false;
		} else {
			setPhoneError(false);
			setPhoneErrorMessage('');
		}

		// Validation de l'email
		if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
			setEmailError(true);
			setEmailErrorMessage('Please enter a valid email address.');
			isValid = false;
		} else {
			setEmailError(false);
			setEmailErrorMessage('');
		}

		// Validation du mot de passe
		if (!password.value || !passwordRegex.test(password.value)) {
			setPasswordError(true);
			setPasswordErrorMessage(
				'Password must be at least 6 characters long, include 1 uppercase letter, 1 number, and 1 special character.'
			);
			isValid = false;
		} else {
			setPasswordError(false);
			setPasswordErrorMessage('');
		}

		// Validation de la confirmation du mot de passe
		if (!confirmPassword.value || confirmPassword.value !== password.value) {
			setConfirmPasswordError(true);
			setConfirmPasswordErrorMessage('Passwords do not match.');
			isValid = false;
		} else {
			setConfirmPasswordError(false);
			setConfirmPasswordErrorMessage('');
		}

		return isValid;
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!validateInputs()) {
			return;
		}

		// Extract country code and formatted phone number
		const phoneNumberObj = parsePhoneNumberFromString(phoneValue || '');
		if (phoneNumberObj) {
			const formattedPhoneNumber = phoneNumberObj.nationalNumber;
			const countryCode = phoneNumberObj.country;

			// Prepare user data for submission
			const userData = {
				firstName: (document.getElementById('fname') as HTMLInputElement).value,
				lastName: (document.getElementById('lname') as HTMLInputElement).value,
				email: (document.getElementById('email') as HTMLInputElement).value,
				password: (document.getElementById('password') as HTMLInputElement)
					.value,
				countryCode: countryCode || '',
				phoneNumber: formattedPhoneNumber,
				userTypeId: 1, // Assuming default userTypeId for a new user is 1
			};

			// Trigger mutation to add user
			addUserMutation.mutate(userData);

			navigate('/login');
		}
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
					href='/'
					variant='h6'
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
			<RegisterContainer direction='column' justifyContent='space-between'>
				<Card variant='outlined'>
					<Typography
						component='h1'
						variant='h4'
						sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
					>
						Registration
					</Typography>
					<Box
						component='form'
						onSubmit={handleSubmit}
						noValidate
						sx={{
							display: 'flex',
							flexDirection: 'column',
							width: '100%',
							gap: 2,
						}}
					>
						<FormControl error={fnameError}>
							<FormLabel htmlFor='fname'>First Name</FormLabel>
							<TextField
								id='fname'
								type='text'
								name='fname'
								placeholder='Jean'
								required
								variant='outlined'
							/>
						</FormControl>

						<FormControl error={lnameError}>
							<FormLabel htmlFor='lname'>Last Name</FormLabel>
							<TextField
								id='lname'
								type='text'
								name='lname'
								placeholder='Doe'
								required
								variant='outlined'
							/>
						</FormControl>

						<FormControl error={phoneError}>
							<FormLabel htmlFor='phone'>Phone Number</FormLabel>
							<PhoneInput
								id='phone'
								placeholder='Enter phone number'
								value={phoneValue}
								onChange={setPhoneValue}
								defaultCountry='CA'
								required
								variant='outlined'
							/>
						</FormControl>

						<FormControl error={emailError}>
							<FormLabel htmlFor='email'>Email</FormLabel>
							<TextField
								id='email'
								type='email'
								name='email'
								placeholder='Enter your email'
								required
								variant='outlined'
							/>
						</FormControl>

						<FormControl error={passwordError}>
							<FormLabel htmlFor='password'>Password</FormLabel>
							<TextField
								id='password'
								type='password'
								name='password'
								placeholder='Enter your password'
								required
								variant='outlined'
							/>
						</FormControl>

						<FormControl error={confirmPasswordError}>
							<FormLabel htmlFor='confirm-password'>Confirm Password</FormLabel>
							<TextField
								id='confirm-password'
								type='password'
								name='confirm-password'
								placeholder='Confirm your password'
								required
								variant='outlined'
							/>
						</FormControl>

						<Button type='submit' variant='contained' color='primary'>
							Register
						</Button>
					</Box>
				</Card>
			</RegisterContainer>
		</AppTheme>
	);
}
