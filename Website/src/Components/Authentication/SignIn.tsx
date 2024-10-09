// src/components/signin.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { login } from './authService';

const SignIn: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string>(''); // Explicitly type error as string
	const navigate = useNavigate(); // Use useNavigate for navigation

	const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault(); // Prevent default form submission

		try {
			await login(email, password);
			navigate('/dashboard'); // Redirect to dashboard after successful login
		} catch (err: unknown) {
			// Type guard for error handling
			if (err instanceof Error) {
				setError('Invalid login credentials'); // Generic error message
			} else {
				setError('An unexpected error occurred.'); // Generic error message
			}
		}
	};

	return (
		<div style={{ width: '300px', margin: '50px auto' }}>
			<h2>Sign In</h2>
			<form onSubmit={handleLogin}>
				<div>
					<label>Email</label>
					<input
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
					/>
				</div>
				<div>
					<label>Password</label>
					<input
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
					/>
				</div>
				{error && <div style={{ color: 'red' }}>{error}</div>}
				<button type='submit' style={{ padding: '10px 20px' }}>
					Sign In
				</button>
			</form>
		</div>
	);
};

export default SignIn;
