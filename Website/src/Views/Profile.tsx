import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

function ProfilePage() {
	const theme = useTheme();
	return (
		<Box
			sx={{
				width: "100%",
				padding: "0 2% 0 2%"
			}}
		>

			<Box>
				<CardMedia
					sx={{ height: 160, borderRadius: "10px" }}
					image={'https://placehold.co/600x400'}
					title="Bg Image"
				/>

				<Box sx={{ display: 'flex' }}>
					<CardMedia
						sx={{
							height: '150px',
							width: '150px',
							borderRadius: '10px',
							border: '1px solid black',
							position: 'relative',
							bottom: 40,
							left: 20,
							zIndex: 5,
							marginRight: '2rem',
						}}
						image={'https://placehold.co/600x400'}
						title="User Logo"
					/>

					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'start',
							width: '80%',
						}}
					>
						<Typography
							variant="h4"
							sx={{
								color: 'text.primary',
								paddingTop: "1%"
							}}
						>
							Firstname LASTNAME
						</Typography>

						<Typography
							variant="h5"
							sx={{
								color: 'text.primary',
								fontWeight: "medium",
								paddingTop: "1%"
							}}
						>
							Job name
						</Typography>
					</Box>
				</Box>
			</Box>

			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: 2,
				}}
			>
				{/* Première carte */}
				<Box
					component={RouterLink}
					to="#"
					sx={{
						textDecoration: 'none',
						flex: '1 1 45%',
						maxWidth: 345,
						minHeight: "10rem",
						[theme.breakpoints.up('md')]: {
							flex: '1 1 22%',
						},
						'&:hover .MuiCard-root': {
							boxShadow: theme.palette.mode === 'light'
								? '0px 4px 20px rgba(0, 0, 0, 0.3)'
								: '0px 4px 20px rgba(255, 255, 255, 0.3)',
						},
					}}
				>
					<Card sx={{ height: '100%', cursor: 'pointer' }}>
						<CardContent>
							<Typography gutterBottom variant="h5" component="div">
								My applications
							</Typography>
							<Typography variant="body2" color="text.secondary">
								Here you will find all the offers you have applied for.
							</Typography>
						</CardContent>
					</Card>
				</Box>

				{/* Deuxième carte */}
				<Box
					component={RouterLink}
					to="#"
					sx={{
						textDecoration: 'none',
						flex: '1 1 45%',
						maxWidth: 345,
						[theme.breakpoints.up('md')]: {
							flex: '1 1 22%',
						},
						'&:hover .MuiCard-root': {
							boxShadow: theme.palette.mode === 'light'
								? '0px 4px 20px rgba(0, 0, 0, 0.3)'
								: '0px 4px 20px rgba(255, 255, 255, 0.3)',
						},
					}}
				>
					<Card sx={{ height: '100%', cursor: 'pointer' }}>
						<CardContent>
							<Typography gutterBottom variant="h5" component="div">
								My messages
							</Typography>
							<Typography variant="body2" color="text.secondary">
								Here you will find your mailbox with all the exchanges you have made with companies.
							</Typography>
						</CardContent>
					</Card>
				</Box>

			</Box>

		</Box>
	);
}

export default ProfilePage;
