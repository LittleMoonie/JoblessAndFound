import React from 'react';
import { Box, Avatar, CardMedia, Typography, Button, Divider, Stack, Grid, Tab, Tabs } from '@mui/material';
import { useAuth } from '../Context/authContext';
import { Link } from 'react-router-dom';

function ProfilePage() {
  const { userFirstName, userLastName } = useAuth();

  return (
    <Box sx={{ width: '100%', bgcolor: '#f5f5f5', padding: 2 }}>
      {/* Profile Cover Photo */}
      <CardMedia
        component="img"
        image="https://placehold.co/1200x400" // Replace with actual cover image
        alt="Profile cover"
        sx={{
          height: { xs: 200, md: 300 }, // Responsive height for mobile/desktop
          borderRadius: '10px',
          position: 'relative',
        }}
      />

      {/* Avatar and Profile Info */}
      <Box sx={{ mt: -10, px: { xs: 2, md: 4 }, position: 'relative' }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-end' }}>
          <Avatar
            alt={`${userFirstName} ${userLastName}`}
            src="https://placehold.co/100x100" // Replace with actual avatar image
            sx={{
              width: { xs: 80, md: 150 },
              height: { xs: 80, md: 150 },
              border: '4px solid white',
              borderRadius: '50%',
            }}
          />

          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h5" fontWeight="bold">
              {userFirstName} {userLastName}
            </Typography>
            <Typography variant="subtitle1">Android Developer</Typography>
          </Box>

          <Stack direction="row" spacing={1}>
            <Button variant="contained" sx={{ bgcolor: '#6568FF', color: 'white' }}>
              Message
            </Button>
            <Button variant="outlined" sx={{ borderColor: '#6568FF', color: '#6568FF' }}>
              Send Request
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* Tabs Section */}
      <Box sx={{ mt: 4 }}>
        <Tabs value={0} textColor="primary" indicatorColor="primary">
          <Tab label="Profile" />
          <Tab label="Followers" />
          <Tab label="Friends" />
          <Tab label="Gallery" />
          <Tab label="Friend Request" />
        </Tabs>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={6} md={3}>
          <Box
            sx={{
              bgcolor: 'white',
              p: 2,
              textAlign: 'center',
              borderRadius: '10px',
              boxShadow: 1,
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              239k
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Friends
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Box
            sx={{
              bgcolor: 'white',
              p: 2,
              textAlign: 'center',
              borderRadius: '10px',
              boxShadow: 1,
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              234k
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Followers
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* About Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" fontWeight="bold">
          About
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Typography variant="body1">
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
        </Typography>
      </Box>

      {/* Post Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" fontWeight="bold">
          {`What's on your mind, ${userFirstName}?`}
        </Typography>
        <Box
          sx={{
            bgcolor: 'white',
            borderRadius: '10px',
            p: 2,
            mt: 2,
            boxShadow: 1,
          }}
        >
          <textarea
            placeholder="What's on your mind?"
            style={{
              width: '100%',
              height: '80px',
              padding: '10px',
              borderRadius: '10px',
              border: '1px solid #ccc',
              fontSize: '16px',
            }}
          ></textarea>
          <Button variant="contained" sx={{ mt: 2, bgcolor: '#6568FF', color: 'white' }}>
            Post
          </Button>
        </Box>
      </Box>

      {/* Feed Section */}
      <Box sx={{ mt: 4 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar alt={`${userFirstName} ${userLastName}`} src="https://placehold.co/50x50" />
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {userFirstName} {userLastName}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              2 hours ago
            </Typography>
          </Box>
        </Stack>
        <Typography variant="body1" sx={{ mt: 2 }}>
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
        </Typography>
      </Box>
    </Box>
  );
}

export default ProfilePage;
