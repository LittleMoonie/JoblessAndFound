import React from 'react';
import monImage from '../../Assets/logo.png';
import { Container, Typography, Box, Grid, Link } from '@mui/material';

const ProblemWithMyAccount: React.FC = () => {
  return (
    <Box>
      <Box
        sx={{
          padding: "4%",
          backgroundColor: "#F1BC61"
        }}
      >
        <Typography variant="h4" gutterBottom
          sx={{
            textAlign: "center",
          }}
        >
          Problem with My Account
        </Typography>

        <Typography variant="h6" gutterBottom
          sx={{
            textAlign: "center",
            marginBottom: "5%"
          }}
        >
          Common Issues and Resolutions
        </Typography>

        <Typography variant="h6" gutterBottom>
          1. **Unable to Log In**
        </Typography>
        <Typography paragraph>
          If you are unable to log in to your account, please check the following:
          <ul>
            <li>Ensure that you are using the correct email address and password.</li>
            <li>If you have forgotten your password, click on the &quot;Forgot Password?&quot; link to reset it.</li>
            <li>Check if your account is locked due to multiple failed login attempts. If so, please wait a few minutes before trying again.</li>
          </ul>
        </Typography>

        <Typography variant="h6" gutterBottom>
          2. **Account Locked**
        </Typography>
        <Typography paragraph>
          Your account may be locked after several unsuccessful login attempts. To unlock your account, please wait 30 minutes or reset your password.
        </Typography>

        <Typography variant="h6" gutterBottom>
          3. **Updating Personal Information**
        </Typography>
        <Typography paragraph>
          To update your personal information (such as your email address or phone number), log in to your account, go to &quot;Account Settings,&quot; and make the necessary changes. Ensure to save your updates.
        </Typography>

        <Typography variant="h6" gutterBottom>
          4. **Unable to Change Password**
        </Typography>
        <Typography paragraph>
          If you are unable to change your password, please ensure:
          <ul>
            <li>Your new password meets the security requirements (e.g., length, special characters).</li>
            <li>You are entering the correct current password.</li>
          </ul>
        </Typography>

        <Typography variant="h6" gutterBottom>
          5. **Account Verification Issues**
        </Typography>
        <Typography paragraph>
          If you have not received your account verification email, please check your spam/junk folder. If you still do not see it, request a new verification email through the &quot;Resend Verification Email&quot; option on the login page.
        </Typography>

        <Typography variant="h6" gutterBottom>
          6. **Unrecognized Charges**
        </Typography>
        <Typography paragraph>
          If you see an unrecognized charge related to your account, please check your account activity for any transactions. If you believe this charge is incorrect, contact our support team.
        </Typography>

        <Typography variant="h6" gutterBottom>
          7. **Other Issues**
        </Typography>
        <Typography paragraph>
          If you are experiencing any other issues that are not covered above, please reach out to our support team for assistance.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Contact Support
        </Typography>
        <Typography paragraph>
          For complex problems or issues that require immediate assistance, please contact our support team at:
          <br />
          Email: support@joblessfound.com
        </Typography>
      </Box>

      {/* --- Footer --- */}
      <Box
        sx={{
          backgroundColor: "#202020", // Couleur d'arrière-plan
          padding: "2% 0",
          color: "#F2BD61", // Couleur du texte
        }}
      >
        {/* Conteneur principal */}
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {/* Image */}
          <Grid item xs={12} md={3} textAlign="center">
            <Link href="/" underline="none">
              <Box
                component="img"
                src={monImage}
                alt="Jobless & Found"
                sx={{
                  width: { xs: "50%", md: "80%" }, // Largeur de l'image pour mobile et desktop
                  marginBottom: { xs: "1rem", md: "0" },
                }}
              />
            </Link>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} md={3} textAlign={{ xs: "center", md: "left" }}>
            <Typography
              sx={{
                fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                fontWeight: "bold",
                marginBottom: "1rem",
              }}
            >
              CONTACT
            </Typography>
            <Typography>
              Contact us at jobless@found.com and we will respond as soon as possible !
            </Typography>
          </Grid>

          {/* Service Client */}
          <Grid item xs={12} md={3} textAlign={{ xs: "center", md: "left" }}>
            <Typography
              sx={{
                fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                fontWeight: "bold",
                marginBottom: "1rem",
              }}
            >
              CUSTOMER SERVICE
            </Typography>
            <Link href="/problem-with-my-account" color="inherit" underline="none">
              <Typography
                sx={{
                  '&:hover': {
                    color: "#BF7900"
                  },
                }}
              >Problem with my account</Typography>
            </Link>
            <Link href="/how-to-add-my-business" color="inherit" underline="none">
              <Typography
                sx={{
                  '&:hover': {
                    color: "#BF7900"
                  },
                }}
              >How to add my business</Typography>
            </Link>
            <Link href="/problem-with-my-business" color="inherit" underline="none">
              <Typography
                sx={{
                  '&:hover': {
                    color: "#BF7900"
                  },
                }}
              >Problem with my business</Typography>
            </Link>
          </Grid>

          {/* Autre */}
          <Grid item xs={12} md={3} textAlign={{ xs: "center", md: "left" }}>
            <Typography
              sx={{
                fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                fontWeight: "bold",
                marginBottom: "1rem",
              }}
            >
              OTHER
            </Typography>
            <Link href="/general-conditions" color="inherit" underline="none">
              <Typography
                sx={{
                  '&:hover': {
                    color: "#BF7900"
                  },
                }}
              >General conditions of use</Typography>
            </Link>
            <Link href="/privacy-policy" color="inherit" underline="none">
              <Typography
                sx={{
                  '&:hover': {
                    color: "#BF7900"
                  },
                }}
              >Privacy Policy</Typography>
            </Link>
            <Link href="/legal-notices" color="inherit" underline="none">
              <Typography
                sx={{
                  '&:hover': {
                    color: "#BF7900"
                  },
                }}
              >Legal notices</Typography>
            </Link>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            marginTop: "2rem",
            borderTop: "1px solid #F2BD61",
            paddingTop: "1rem",
          }}
        >
          <Typography variant="body2" color="#F2BD61">
            2024 - All rights reserved
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProblemWithMyAccount;