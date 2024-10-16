import React from 'react';
import { Grid, Box, Card, CardContent, Typography } from '@mui/material';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

// Register the charts with Chart.js
Chart.register(...registerables);

const AnalyticsDashboard = () => {
  // Data for Line Chart (e.g., User Growth)
  const userGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    datasets: [
      {
        label: 'User Growth',
        data: [100, 120, 150, 180, 210, 240, 270, 300, 330, 400],
        borderColor: '#3E63DD',
        backgroundColor: 'rgba(62, 99, 221, 0.2)',
        fill: true,
      },
    ],
  };

  // Data for Bar Chart (e.g., Job Posts per Category)
  const jobPostsData = {
    labels: ['Tech', 'Finance', 'Healthcare', 'Education', 'Retail', 'Real Estate'],
    datasets: [
      {
        label: 'Job Posts',
        data: [30, 20, 25, 15, 10, 35],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  // Data for Pie Chart (e.g., User Types)
  const userTypeData = {
    labels: ['Job Seekers', 'Employers', 'Moderators'],
    datasets: [
      {
        data: [300, 150, 50],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  // Fancy card style
  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height: '100%',
    boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
    borderRadius: '10px',
    padding: '16px',
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Analytics Dashboard
      </Typography>

      {/* First Row: Line Chart (User Growth) */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                User Growth Over the Year
              </Typography>
              <Line data={userGrowthData} />
            </CardContent>
          </Card>
        </Grid>

        {/* Right Side Cards */}
        <Grid item xs={12} md={4}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Active Users
              </Typography>
              <Typography variant="h3" color="primary" fontWeight="bold">
                12,345
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Active users in the last month
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ ...cardStyle, mt: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Total Job Posts
              </Typography>
              <Typography variant="h3" color="primary" fontWeight="bold">
                6,789
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Job posts this year
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Second Row: Bar Chart (Job Posts per Category) */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={8}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Job Posts by Category
              </Typography>
              <Bar data={jobPostsData} />
            </CardContent>
          </Card>
        </Grid>

        {/* Right Side Cards */}
        <Grid item xs={12} md={4}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Total Companies
              </Typography>
              <Typography variant="h3" color="primary" fontWeight="bold">
                543
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Verified companies on the platform
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ ...cardStyle, mt: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                New Companies this Month
              </Typography>
              <Typography variant="h3" color="primary" fontWeight="bold">
                67
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Companies added this month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Third Row: Pie Chart (User Types) */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                User Types Distribution
              </Typography>
              <Pie data={userTypeData} />
            </CardContent>
          </Card>
        </Grid>

        {/* Additional Analytics Card */}
        <Grid item xs={12} md={6}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Reports Overview
              </Typography>
              <Typography variant="h3" color="primary" fontWeight="bold">
                27
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Reports received this month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsDashboard;
