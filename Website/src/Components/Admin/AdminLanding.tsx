import React from 'react';
import { Card, CardContent, Typography, Grid, Box, CardActionArea, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminLanding = () => {
  const navigate = useNavigate();

  // Helper function to render a card
  const renderCard = (title: string, description: string, path: string) => (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: '150px', // Set uniform height for the cards
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <CardActionArea onClick={() => navigate(path)}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );

  return (
    <Box sx={{ p: 4, maxWidth: '1200px', margin: '0 auto', textAlign: 'left' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* User Management Row */}
      <Typography variant="h5" fontWeight="bold" sx={{ mt: 4 }}>
        User Management
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={3}>
        {renderCard('Manage Users', 'Add, Delete, or Modify Users', '/admin/users')}
      </Grid>

      {/* Company Management Row */}
      <Typography variant="h5" fontWeight="bold" sx={{ mt: 4 }}>
        Company Management
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={3}>
        {renderCard('Manage Companies', 'Add, Delete, or Modify Companies', '/admin/companies')}
        {renderCard('Verify Companies', 'Verify pending companies', '/admin/verify-companies')}
      </Grid>

      {/* Offers Management Row */}
      <Typography variant="h5" fontWeight="bold" sx={{ mt: 4 }}>
        Offers Management
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={3}>
        {renderCard('Manage Offers', 'Add, Delete, or Modify Offers', '/admin/offers')}
        {renderCard('Flagged Offers', 'Manage flagged offers', '/admin/flagged-offers')}
        {renderCard('Reported Offers', 'Manage reported offers', '/admin/reported-offers')}
      </Grid>

      {/* Post Management Row */}
      <Typography variant="h5" fontWeight="bold" sx={{ mt: 4 }}>
        Post Management
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={3}>
        {renderCard('Manage Posts', 'Add, Delete, or Modify Posts', '/admin/posts')}
        {renderCard('Flagged Posts', 'Manage flagged posts', '/admin/flagged-posts')}
        {renderCard('Reported Posts', 'Manage reported posts', '/admin/reported-posts')}
      </Grid>

      {/* Themes Management Row */}
      <Typography variant="h5" fontWeight="bold" sx={{ mt: 4 }}>
        Themes / Job Categories Management
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={3}>
        {renderCard('Manage Themes', 'Add, Delete, or Modify Job Themes', '/admin/themes')}
      </Grid>

      {/* Analytics Row */}
      <Typography variant="h5" fontWeight="bold" sx={{ mt: 4 }}>
        Analytics
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={3}>
        {renderCard('View Analytics', 'View system-wide analytics and data', '/admin/analytics')}
      </Grid>

      {/* Roles and Permissions Row */}
      <Typography variant="h5" fontWeight="bold" sx={{ mt: 4 }}>
        Roles & Permissions Management
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={3}>
        {renderCard('Manage Roles & Permissions', 'Manage roles and permissions for users', '/admin/roles')}
      </Grid>

      {/* Reports / Feedback Row */}
      <Typography variant="h5" fontWeight="bold" sx={{ mt: 4 }}>
        Reports / Feedback Management
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={3}>
        {renderCard('Manage Reports / Feedback', 'Manage user feedback and issue resolution', '/admin/reports')}
      </Grid>

      {/* Notifications Management Row */}
      <Typography variant="h5" fontWeight="bold" sx={{ mt: 4 }}>
        Notifications Management
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={3}>
        {renderCard('Manage Notifications', 'Manage system notifications to users', '/admin/notifications')}
      </Grid>
    </Box>
  );
};

export default AdminLanding;
