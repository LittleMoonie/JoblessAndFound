import React from 'react';
import monImage from '../../Assets/logo.png';
import { Typography, Box, Grid, Link } from '@mui/material';

const GeneralConditions: React.FC = () => {
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
          General Conditions of Use
        </Typography>


        <Typography variant="h6" gutterBottom>
          Introduction
        </Typography>
        <Typography paragraph>
          These General Conditions of Use govern the access to and use of the Jobless&Found website and services. By accessing or using our website, you agree to comply with these terms.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Acceptance of Terms
        </Typography>
        <Typography paragraph>
          By using this website, you confirm that you accept these terms and conditions. If you do not agree to these terms, please do not use our website.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Modification of Terms
        </Typography>
        <Typography paragraph>
          Jobless&Found reserves the right to modify these General Conditions of Use at any time. Any changes will be effective immediately upon posting on the website. Your continued use of the website after changes indicates your acceptance of the new terms.
        </Typography>

        <Typography variant="h6" gutterBottom>
          User Responsibilities
        </Typography>
        <Typography paragraph>
          Users are responsible for ensuring that their use of the website complies with all applicable laws and regulations. You agree not to use the website for any unlawful purposes or in a manner that could harm the website or disrupt its functionality.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Intellectual Property
        </Typography>
        <Typography paragraph>
          All content on the Jobless&Found website, including text, graphics, logos, and images, is the property of Jobless&Found or its content suppliers and is protected by intellectual property laws. Users may not reproduce, distribute, or modify any content without prior written permission.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Limitation of Liability
        </Typography>
        <Typography paragraph>
          Jobless&Found shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the website or inability to use the website. This includes, but is not limited to, damages for loss of profits, data, or other intangible losses.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Governing Law
        </Typography>
        <Typography paragraph>
          These General Conditions of Use are governed by the laws of the United States of America. Any disputes arising from these terms will be subject to the exclusive jurisdiction of the courts in the state of California.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Contact Information
        </Typography>
        <Typography paragraph>
          If you have any questions about these General Conditions of Use, please contact us at:
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

export default GeneralConditions;