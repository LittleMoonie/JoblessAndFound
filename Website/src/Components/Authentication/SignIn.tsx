import React, { useState } from 'react';
import { Box, Button, Container, Grid, Paper, TextField, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import { useAPIClient } from '../../Context/apiContext';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  marginTop: theme.spacing(10),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0px 5px 20px rgba(0, 0, 0, 0.3)',
  backgroundColor: theme.palette.background.paper,
}));

const BackgroundBox = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(3),
}));

const SignInPage: React.FC = () => {
  const theme = useTheme();
  const { apiClient, fetchData } = useAPIClient();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const { result, error } = await fetchData<{ token: string }>(() =>
        apiClient.authentication_login(email, password)
      );

      if (error || !result) {
        setError('Login failed. Please check your credentials.');
        return;
      }

      console.log('Login result:', result);

      if (result.token) {
        localStorage.setItem('token', result.token);
        navigate('/dashboard');
      } else {
        setError('Unexpected response format from server.');
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error('Login failed:', err);
    }
  };

  return (
    <BackgroundBox>
      <Container component="main" maxWidth="xs">
        <StyledPaper elevation={6}>
          <Avatar sx={{ m: 1, bgcolor: theme.palette.secondary.main }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              // Removed autoFocus or implemented programmatic focus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                fontWeight: 'bold',
                borderRadius: '20px',
                boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
              }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Button variant="text" size="small" color="secondary">
                  Forgot password?
                </Button>
              </Grid>
              <Grid item>
                <Button href="/register" variant="text" size="small" color="secondary">
                  {"Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </StyledPaper>
      </Container>
    </BackgroundBox>
  );
};

SignInPage.displayName = 'SignInPage';

export default SignInPage;
