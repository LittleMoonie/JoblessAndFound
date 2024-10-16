import { Box, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

function ProfilePage() {
	return (
		<Box>
			<Box>
				<CardMedia
					sx={{ height: 160 }}
					image={'https://placehold.co/600x400'}
					title="Company Image"
				/>

				<Box sx={{ display: 'flex' }}>
					<CardMedia
						sx={{
							height: 90,
							width: '6rem',
							borderRadius: '10px',
							border: '1px solid black',
							position: 'relative',
							bottom: 40,
							left: 20,
							zIndex: 5,
							marginRight: '2rem',
						}}
						image={'https://placehold.co/600x400'}
						title="Company Logo"
					/>

					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'start',
							width: '80%',
						}}
					>
						<Link
							href="#"
							variant="h5"
							sx={{
								color: '#6568FF',
								'&:hover': {
									color: '#33348A',
								},
							}}
						>
							Firstname LASTNAME
						</Link>

						<Typography component="div" sx={{ display: 'flex', alignItems: 'center' }}>
							Job name
						</Typography>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}

export default ProfilePage;
