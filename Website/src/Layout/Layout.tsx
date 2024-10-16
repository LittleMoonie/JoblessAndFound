import React from 'react';
import { Outlet } from 'react-router-dom';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from '../Components/AppNavbar';
import AppTheme from '../Components/AppTheme';
import { chartsCustomizations } from '../Components/customizations/chart';
import { dataGridCustomizations } from '../Components/customizations/dataGrid';
import { datePickersCustomizations } from '../Components/customizations/datePickers';
import { treeViewCustomizations } from '../Components/customizations/treeView';
import Header from '../Components/Dashboard/Header';
import SideMenu from '../Components/Dashboard/SideMenu';

const xThemeComponents = {
	...chartsCustomizations,
	...dataGridCustomizations,
	...datePickersCustomizations,
	...treeViewCustomizations,
};

interface LayoutProps {
	disableCustomTheme?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ disableCustomTheme }) => {
	return (
		<AppTheme
			disableCustomTheme={disableCustomTheme}
			themeComponents={xThemeComponents}
		>
			<CssBaseline enableColorScheme />
			<Box sx={{ display: 'flex', height: '100vh' }}>
				<SideMenu />
				<Box
					component='main'
					sx={(theme) => ({
						flexGrow: 1,
						backgroundColor: alpha(theme.palette.background.default, 1),
						overflow: 'auto',
						padding: theme.spacing(3), 
						minHeight: '100vh',
					})}
				>
					<AppNavbar />
					<Header />
					<Box sx={{ mt: 2 }}>
						<Outlet />
					</Box>
				</Box>
			</Box>
		</AppTheme>
	);
};

export default Layout;
