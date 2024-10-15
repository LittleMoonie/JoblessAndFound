import * as React from 'react';
import { useNavigate } from 'react-router-dom';
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
import GavelIcon from '@mui/icons-material/Gavel';

// Define the menu items with path properties for navigation
const mainListItems = [
  { text: 'Home', icon: <HomeRoundedIcon />, path: '/home' },
  { text: 'User', icon: <PeopleRoundedIcon />, path: '/user' },
  { text: 'Business', icon: <CorporateFareIcon />, path: '/business' },
];

const secondaryListItems = [
    { text: 'Settings', icon: <SettingsRoundedIcon />, path: '/settings' },
    { text: 'Moderator', icon: <GavelIcon />, path: '/moderator' },
    { text: 'Admin', icon: <LockIcon />, path: '/admin' },
  // You can uncomment and add more items here as needed
  // { text: 'About', icon: <InfoRoundedIcon />, path: '/about' },
  // { text: 'Feedback', icon: <HelpRoundedIcon />, path: '/feedback' },
];

export default function MenuContent() {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle navigation
  const handleNavigation = (path: string) => {
    navigate(path); // Navigate to the path specified
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton onClick={() => handleNavigation(item.path)} selected={index === 0}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton onClick={() => handleNavigation(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
