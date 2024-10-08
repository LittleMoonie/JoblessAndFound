import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import LockIcon from '@mui/icons-material/Lock';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
// import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
// import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import GavelIcon from '@mui/icons-material/Gavel';

const mainListItems = [
    { text: 'Home', icon: <HomeRoundedIcon /> },
    { text: 'User', icon: <PeopleRoundedIcon /> },
    { text: 'Business', icon: <CorporateFareIcon /> },
    { text: 'Moderator', icon: <GavelIcon /> },
    { text: 'Admin', icon: <LockIcon /> },
];

const secondaryListItems = [
    { text: 'Settings', icon: <SettingsRoundedIcon /> },
    // { text: 'About', icon: <InfoRoundedIcon /> },
    // { text: 'Feedback', icon: <HelpRoundedIcon /> },
];

export default function MenuContent() {
    return (
        <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
            <List dense>
                {mainListItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton selected={index === 0}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <List dense>
                {secondaryListItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Stack>
    );
}