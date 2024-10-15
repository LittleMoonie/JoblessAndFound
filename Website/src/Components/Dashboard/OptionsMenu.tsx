import * as React from 'react';
import { styled } from '@mui/material/styles';
import Divider, { dividerClasses } from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MuiMenuItem from '@mui/material/MenuItem';
import { paperClasses } from '@mui/material/Paper';
import { listClasses } from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon, { listItemIconClasses } from '@mui/material/ListItemIcon';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import MenuButton from './MenuButton';

import { useAuth } from '../../Context/authContext';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import apiClient from '../../API/apiClient';

// Styled MenuItem
const MenuItem = styled(MuiMenuItem)({
	margin: '2px 0',
});

export default function OptionsMenu() {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const { checkAuthStatus } = useAuth();
	const navigate = useNavigate();

	const logoutMutation = useMutation({
		mutationFn: () => apiClient.authentication_logout(),
		onSuccess: async () => {
			await checkAuthStatus();
			navigate('/login');
		},
		onError: (err: unknown) => {
			console.error('Logout failed:', err);
		},
	});

	const handleLogout = () => {
		logoutMutation.mutate();
	};

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<React.Fragment>
			<MenuButton
				aria-label='Open menu'
				onClick={handleClick}
				sx={{ borderColor: 'transparent' }}
			>
				<MoreVertRoundedIcon />
			</MenuButton>
			<Menu
				anchorEl={anchorEl}
				id='menu'
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
				sx={{
					[`& .${listClasses.root}`]: {
						padding: '4px',
					},
					[`& .${paperClasses.root}`]: {
						padding: 0,
					},
					[`& .${dividerClasses.root}`]: {
						margin: '4px -4px',
					},
				}}
			>
				<MenuItem onClick={handleClose}>Profile</MenuItem>
				{/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
				{/* <Divider /> */}
				{/* <MenuItem onClick={handleClose}>Add another account</MenuItem> */}
				<MenuItem onClick={handleClose}>Settings</MenuItem>
				<Divider />
				<MenuItem
					onClick={() => {
						handleClose(); // Close the menu first
						handleLogout(); // Trigger logout
					}}
					sx={{
						[`& .${listItemIconClasses.root}`]: {
							ml: 'auto',
							minWidth: 0,
						},
					}}
				>
					<ListItemText
						sx={{
							paddingRight: '5px',
						}}
					>
						Logout
					</ListItemText>
					<ListItemIcon>
						<LogoutRoundedIcon fontSize='small' />
					</ListItemIcon>
				</MenuItem>
			</Menu>
		</React.Fragment>
	);
}
