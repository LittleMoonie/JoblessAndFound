import React from 'react';
import monImage from '../../Assets/logo.png';
import { Typography, Box, Grid, Link } from '@mui/material';

const ProblemWithMyBusiness: React.FC = () => {
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
          Problem with My Business
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
          1. **Unable to Access My Business Profile**
        </Typography>
        <Typography paragraph>
          If you are unable to access your business profile, please check the following:
          <ul>
            <li>Ensure you are using the correct login credentials.</li>
            <li>If you have forgotten your password, use the &quot;Forgot Password?&quot; link to reset it.</li>
            <li>Check if your account is locked due to multiple failed login attempts.</li>
          </ul>
        </Typography>

        <Typography variant="h6" gutterBottom>
          2. **Business Information Not Displaying Correctly**
        </Typography>
        <Typography paragraph>
          If your business information is not displaying correctly on the platform, please verify:
          <ul>
            <li>Ensure all required fields are filled out in your business profile.</li>
            <li>Check for any updates or changes you may have made that haven’t been saved.</li>
          </ul>
        </Typography>

        <Typography variant="h6" gutterBottom>
          3. **Pending Approval Status**
        </Typography>
        <Typography paragraph>
          If your business profile is pending approval, it typically takes 3-5 business days for the admin team to review your application. If you have been waiting longer than this period, please contact support.
        </Typography>

        <Typography variant="h6" gutterBottom>
          4. **Unable to Edit Business Information**
        </Typography>
        <Typography paragraph>
          If you are unable to edit your business information, please check the following:
          <ul>
            <li>Make sure you are logged in to your account.</li>
            <li>Ensure you have the necessary permissions to make changes.</li>
            <li>If your business is still pending approval, you may not be able to edit until it is approved.</li>
          </ul>
        </Typography>

        <Typography variant="h6" gutterBottom>
          5. **Unrecognized Charges Related to My Business**
        </Typography>
        <Typography paragraph>
          If you notice any unrecognized charges related to your business account, please review your recent transactions. If you believe there has been an error, contact our support team for assistance.
        </Typography>

        <Typography variant="h6" gutterBottom>
          6. **Other Issues**
        </Typography>
        <Typography paragraph>
          If you are experiencing any other issues with your business profile that are not covered above, please reach out to our support team for assistance.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Need Help?
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

export default ProblemWithMyBusiness;