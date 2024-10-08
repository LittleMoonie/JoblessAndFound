import * as React from 'react';
import type { } from '@mui/x-date-pickers/themeAugmentation';
import type { } from '@mui/x-charts/themeAugmentation';
import type { } from '@mui/x-data-grid/themeAugmentation';
import type { } from '@mui/x-tree-view/themeAugmentation';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from './AppNavbar';
import Header from './Header';
// import MainGrid from './MainGrid';
import MediaCard from '../AdCards';
import SideMenu from './SideMenu';
import AppTheme from '../AppTheme';
import { chartsCustomizations } from '../customizations/chart';
import { dataGridCustomizations } from '../customizations/dataGrid';
import { datePickersCustomizations } from '../customizations/datePickers';
import { treeViewCustomizations } from '../customizations/treeView';

const xThemeComponents = {
    ...chartsCustomizations,
    ...dataGridCustomizations,
    ...datePickersCustomizations,
    ...treeViewCustomizations,
};

export default function Dashboard(props: { disableCustomTheme?: boolean }) {
    return (
        <AppTheme {...props} themeComponents={xThemeComponents}>
            <CssBaseline enableColorScheme />
            <Box sx={{ display: 'flex' }}>
                <SideMenu />
                <AppNavbar />
                {/* Main content */}
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
                        <Header />

                        {/* --------- CONTENU DU DASHBOARD ----------- */}

                        {/* Data Grids
                        <MainGrid /> */}

                        {/* Ad cards (for users) */}
                        <MediaCard />


                    </Stack>
                </Box>
            </Box>
        </AppTheme>
    );
}