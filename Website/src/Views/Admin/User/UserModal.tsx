import React, { useState, useEffect } from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Snackbar,
	Alert,
	SelectChangeEvent,
} from '@mui/material';
import PhoneInput from 'react-phone-number-input';
import { UserData } from './ManageUsers';
import 'react-phone-number-input/style.css';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

interface UserModalProps {
	open: boolean;
	onClose: () => void;
	onSave: (user: {
		userId: number;
		firstName: string;
		lastName: string;
		email: string;
		password?: string;
		phoneNumber: string;
		countryCode: string;
		userTypeId: number;
	}) => void;
	initialData?: UserData;
}

const roles = [
	{ id: 4, name: 'Admin' },
	{ id: 3, name: 'Moderator' },
	{ id: 2, name: 'Recruiter' },
	{ id: 1, name: 'User' },
];

const UserModal: React.FC<UserModalProps> = ({
	open,
	onClose,
	onSave,
	initialData,
}) => {
	const [userData, setUserData] = useState({
		userId: 0,
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		phoneNumber: '',
		countryCode: '',
		userTypeId: 1,
	});

	const [phoneValue, setPhoneValue] = useState<string | undefined>(undefined);
	const [error, setError] = useState<string | null>(null);
	const [openSnackbar, setOpenSnackbar] = useState(false);

	useEffect(() => {
		if (initialData) {
			setUserData({
				userId: initialData.userId,
				firstName: initialData.firstName,
				lastName: initialData.lastName,
				email: initialData.email,
				password: '',
				phoneNumber: initialData.phoneNumber,
				countryCode: '',
				userTypeId: initialData.userTypeId,
			});
			setPhoneValue(initialData.phoneNumber);
		} else {
			setUserData({
				userId: 0,
				firstName: '',
				lastName: '',
				email: '',
				password: '',
				phoneNumber: '',
				countryCode: '',
				userTypeId: 1,
			});
			setPhoneValue('');
		}
	}, [initialData]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUserData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handlePhoneChange = (value: string | undefined) => {
		setPhoneValue(value);
	};

	const handleSelectChange = (e: SelectChangeEvent<number>) => {
		setUserData((prevData) => ({
			...prevData,
			userTypeId: e.target.value as number,
		}));
	};

	const handleSubmit = () => {
		if (
			!userData.firstName ||
			!userData.lastName ||
			!userData.email ||
			!phoneValue
		) {
			setError('All fields are required.');
			setOpenSnackbar(true);
			return;
		}

		// Parse and validate the phone number
		const phoneNumberObj = parsePhoneNumberFromString(phoneValue || '');
		if (!phoneNumberObj || !phoneNumberObj.isValid()) {
			setError('Invalid phone number.');
			setOpenSnackbar(true);
			return;
		}

		// Strip the country code and format the phone number before saving
		const formattedPhoneNumber = phoneNumberObj.nationalNumber;
		const countryCode = phoneNumberObj.country;

		const { password, ...restUserData } = userData;
		const saveData = {
			...restUserData,
			phoneNumber: formattedPhoneNumber, // Send phone without country code
			countryCode: countryCode || '', // Store the country code separately
		};

		onSave(saveData);
		onClose();
	};

	const handleCloseSnackbar = () => {
		setOpenSnackbar(false);
	};

	return (
		<Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
			<DialogTitle>{initialData ? 'Edit User' : 'Add User'}</DialogTitle>
			<DialogContent>
				<TextField
					margin='dense'
					label='First Name'
					name='firstName'
					value={userData.firstName}
					onChange={handleInputChange}
					fullWidth
					required
				/>
				<TextField
					margin='dense'
					label='Last Name'
					name='lastName'
					value={userData.lastName}
					onChange={handleInputChange}
					fullWidth
					required
				/>
				<TextField
					margin='dense'
					label='Email'
					name='email'
					value={userData.email}
					onChange={handleInputChange}
					fullWidth
					required
				/>
				{!initialData && (
					<TextField
						margin='dense'
						label='Password'
						name='password'
						type='password'
						value={userData.password}
						onChange={handleInputChange}
						fullWidth
						required
					/>
				)}
				<FormControl fullWidth margin='dense'>
					<InputLabel>Role</InputLabel>
					<Select
						label='Role'
						value={userData.userTypeId}
						onChange={handleSelectChange}
					>
						{roles.map((role) => (
							<MenuItem key={role.id} value={role.id}>
								{role.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<PhoneInput
					international
					defaultCountry='US'
					value={phoneValue}
					onChange={handlePhoneChange}
					error={error ? 'Invalid phone number' : undefined}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color='secondary'>
					Cancel
				</Button>
				<Button onClick={handleSubmit} color='primary'>
					Save
				</Button>
			</DialogActions>

			<Snackbar
				open={openSnackbar}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
			>
				<Alert onClose={handleCloseSnackbar} severity='error'>
					{error}
				</Alert>
			</Snackbar>
		</Dialog>
	);
};

export default UserModal;
