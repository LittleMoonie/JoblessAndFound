import React from 'react';
import monImage from '../../Assets/logo.png';
import { Container, Typography, Box, Grid, Link } from '@mui/material';

const PrivacyPolicy: React.FC = () => {
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
          Privacy Policy
        </Typography>
        <Typography paragraph
          sx={{
            textAlign: "center",
            marginBottom: "5%"
          }}
        >
          Last updated: 16/10/2024
        </Typography>

        <Typography variant="h6" gutterBottom>
          Introduction
        </Typography>
        <Typography paragraph>
          At Jobless&Found, we value your privacy and are committed to protecting your personal data. This Privacy Policy outlines how we collect, use, and safeguard your information when you visit our website or use our services.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Information We Collect
        </Typography>
        <Typography paragraph>
          We may collect the following types of information:
          <ul>
            <li>Personal Identification Information: Name, email address, phone number, etc.</li>
            <li>Usage Data: Information about how you use our website and services.</li>
            <li>Cookies: Small data files stored on your device to enhance your experience.</li>
          </ul>
        </Typography>

        <Typography variant="h6" gutterBottom>
          How We Use Your Information
        </Typography>
        <Typography paragraph>
          Jobless&Found may use your information for the following purposes:
          <ul>
            <li>To provide and maintain our services.</li>
            <li>To improve our website and services.</li>
            <li>To communicate with you, including sending updates and promotional materials.</li>
            <li>To comply with legal obligations and protect our rights.</li>
          </ul>
        </Typography>

        <Typography variant="h6" gutterBottom>
          Data Security
        </Typography>
        <Typography paragraph>
          We implement reasonable security measures to protect your personal data from unauthorized access, use, or disclosure. However, no method of transmission over the Internet or electronic storage is 100% secure.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Your Rights
        </Typography>
        <Typography paragraph>
          You have the right to:
          <ul>
            <li>Access the personal data we hold about you.</li>
            <li>Request correction of inaccurate or incomplete data.</li>
            <li>Request the deletion of your personal data.</li>
            <li>Withdraw consent to processing your data at any time.</li>
          </ul>
        </Typography>

        <Typography variant="h6" gutterBottom>
          Changes to This Privacy Policy
        </Typography>
        <Typography paragraph>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Contact Us
        </Typography>
        <Typography paragraph>
          If you have any questions or concerns about this Privacy Policy, please contact us at:
          <br />
          Email: info@joblessfound.com
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

export default PrivacyPolicy;