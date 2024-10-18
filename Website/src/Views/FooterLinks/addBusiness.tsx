import React from 'react';
import monImage from '../../Assets/logo.png';
import { Typography, Box, Grid, Link } from '@mui/material';

const HowToAddMyBusiness: React.FC = () => {
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
            marginBottom: "5%"

          }}
        >
          How to Add My Business
        </Typography>

        <Box>

          <Typography variant="h6" gutterBottom>
            Step-by-Step Guide
          </Typography>

          <Typography paragraph>
            Adding your business to Jobless&Found is a straightforward process that allows you to showcase your company to our community. Follow these steps to successfully add your business.
          </Typography>

          <Typography variant="h6" gutterBottom>
            Step 1: Prepare Your Business Information
          </Typography>
          <Typography paragraph>
            Before filling out the form, ensure you have the following information ready:
          </Typography>
          <ul>
            <li>Business Name</li>
            <li>Business Address</li>
            <li>Contact Email</li>
            <li>Phone Number</li>
            <li>Website URL (if available)</li>
            <li>Business Description</li>
            <li>Industry Type</li>
          </ul>

          <Typography variant="h6" gutterBottom>
            Step 2: Fill Out the Registration Form
          </Typography>
          <Typography paragraph>
            Navigate to the &quot;Add Your Business&quot; section on our website and fill out the registration form with the information you prepared. Make sure to provide accurate and complete details to avoid delays in the validation process.
          </Typography>

          <Typography variant="h6" gutterBottom>
            Step 3: Submit Your Application
          </Typography>
          <Typography paragraph>
            After completing the form, click on the &quot;Submit&quot; button. You will receive a confirmation email acknowledging the receipt of your application.
          </Typography>

          <Typography variant="h6" gutterBottom>
            Step 4: Await Admin Approval
          </Typography>
          <Typography paragraph>
            Once submitted, your application will be reviewed by our admin team. This process typically takes 3-5 business days. During this time, the team will verify the provided information.
          </Typography>

          <Typography variant="h6" gutterBottom>
            Step 5: Receive Confirmation
          </Typography>
          <Typography paragraph>
            After the review, you will receive an email notification regarding the status of your application. If approved, your business will be listed on our platform. If any additional information is needed, our team will reach out to you.
          </Typography>

          <Typography variant="h6" gutterBottom>
            Tips for a Successful Application
          </Typography>
          <ul>
            <li>Double-check your information for accuracy.</li>
            <li>Provide a detailed business description.</li>
            <li>Ensure your contact details are correct.</li>
            <li>Be patient during the review process.</li>
          </ul>

          <Typography variant="h6" gutterBottom>
            Need Help?
          </Typography>
          <Typography paragraph>
            If you encounter any issues during the application process or have questions, please contact our support team at:
            <br />
            Email: support@joblessfound.com
          </Typography>
        </Box>
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

export default HowToAddMyBusiness;