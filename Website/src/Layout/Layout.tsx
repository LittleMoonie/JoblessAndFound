// src/components/Layout.tsx

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
    <AppTheme disableCustomTheme={disableCustomTheme} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        {/* Sidebar Menu */}
        <SideMenu />

        {/* Top Navbar */}
        <AppNavbar />

        {/* Main Content Area */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.palette.primary.main
              ? `rgba(${theme.palette.background.paper} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            {/* Header Section */}
            <Header />

            {/* Routed Content Will Appear Here */}
            <Outlet />
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
};

export default Layout;
