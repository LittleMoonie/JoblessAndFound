import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';

import MenuButton from './MenuButton';
import MenuContent from './MenuContent';
// import CardAlert from './CardAlert';

import { useAuth } from '../../Context/authContext';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

interface SideMenuMobileProps {
	open: boolean | undefined;
	toggleDrawer: (newOpen: boolean) => () => void;
}

export default function SideMenuMobile({
	open,
	toggleDrawer,
}: SideMenuMobileProps) {
	const {userFirstName, userLastName } = useAuth();

	const navigate = useNavigate();

	const logoutMutation = useMutation({
		mutationFn: async () => {
			const response = await fetch('http://localhost:5000/api/Authentication/logout', {
				method: 'POST',
				credentials: 'include', 
			});

			if (!response.ok) {
				throw new Error('Logout failed');
			}
		}
	});

	const handleLogout = () => {
		navigate('/login');
		logoutMutation.mutate();
	};

	return (
		<Drawer
			anchor='right'
			open={open}
			onClose={toggleDrawer(false)}
			sx={{
				[`& .${drawerClasses.paper}`]: {
					backgroundImage: 'none',
					backgroundColor: 'background.paper',
				},
			}}
		>
			<Stack
				sx={{
					maxWidth: '70dvw',
					height: '100%',
				}}
			>
				<Stack direction='row' sx={{ p: 2, pb: 0, gap: 1 }}>
					<Stack
						direction='row'
						sx={{ gap: 1, alignItems: 'center', flexGrow: 1, p: 1 }}
					>
						<Avatar
							alt={userFirstName + ' ' + userLastName}
							src='/static/images/avatar/7.jpg'
							sx={{ width: 36, height: 36 }}
						/>
						<Typography component='p' variant='h6'>
							{userFirstName} {userLastName}
						</Typography>
					</Stack>
					<MenuButton showBadge>
						<NotificationsRoundedIcon />
					</MenuButton>
				</Stack>
				<Divider />
				<Stack sx={{ flexGrow: 1 }}>
					<MenuContent />
					<Divider />
				</Stack>
				<Stack sx={{ p: 2 }}>
					<Button
						variant='outlined'
						fullWidth
						startIcon={<LogoutRoundedIcon />}
						onClick={handleLogout}
					>
						Logout
					</Button>
				</Stack>
			</Stack>
		</Drawer>
	);
}
