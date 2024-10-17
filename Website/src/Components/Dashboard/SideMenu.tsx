import * as React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import Typography from '@mui/material/Typography';
import MenuContent from './MenuContent';
import OptionsMenu from './OptionsMenu';
import Tooltip from '@mui/material/Tooltip';
import { useAuth } from '../../Context/authContext';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)(({ theme }) => ({
	width: drawerWidth,
	flexShrink: 0,
	boxSizing: 'border-box',
	[`& .${drawerClasses.paper}`]: {
		width: drawerWidth,
		boxSizing: 'border-box',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		backgroundColor: theme.palette.background.paper,
	},
}));

export default function SideMenu() {
	const { userFirstName, userLastName, userEmail } = useAuth();

	return (
		<Drawer
			variant='permanent'
			sx={{
				display: { xs: 'none', md: 'block' },
				[`& .${drawerClasses.paper}`]: {
					backgroundColor: 'background.paper',
				},
			}}
		>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'flex-start',
					mt: 'calc(var(--template-frame-height, 0px) + 4px)',
					p: 1.5,
					width: '100%',
				}}
			>
				<SpaceDashboardIcon
					sx={{
						marginRight: '8px',
					}}
				/>
				<Typography
					variant='h5'
					component='h1'
					noWrap
					sx={{ color: 'text.primary', fontSize: '1.5rem' }}
				>
					Jobless & Found
				</Typography>
			</Box>
			<Divider />
			<Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
				<MenuContent />
			</Box>
			<Stack
				direction='row'
				sx={{
					p: 2,
					gap: 1,
					alignItems: 'center',
					borderTop: '1px solid',
					borderColor: 'divider',
					justifyContent: 'space-between',
					width: '100%',
				}}
			>
				<Avatar
					alt={userFirstName + ' ' + userLastName}
					src='/static/images/avatar/7.jpg'
					sx={{ width: 36, height: 36 }}
				/>
				<Box sx={{ flex: 1, ml: 1, overflow: 'hidden' }}>
					<Tooltip title={`${userFirstName} ${userLastName}`}>
						<Typography
							variant='body2'
							sx={{
								fontWeight: 500,
								lineHeight: '16px',
								whiteSpace: 'nowrap',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								maxWidth: '120px',
							}}
						>
							{userFirstName} {userLastName}
						</Typography>
					</Tooltip>
					<Tooltip title={userEmail}>
						<Typography
							variant='caption'
							sx={{
								color: 'text.secondary',
								whiteSpace: 'nowrap',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								maxWidth: '120px',
							}}
						>
							{userEmail}
						</Typography>
					</Tooltip>
				</Box>
				<OptionsMenu />
			</Stack>
		</Drawer>
	);
}
