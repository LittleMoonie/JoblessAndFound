import React from 'react';
import monImage from '../../Assets/logo.png';
import { Typography, Box, Grid, Link } from '@mui/material';

const LegalNotices: React.FC = () => {
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
          Legal Notices
        </Typography>

        <Typography variant="h6" gutterBottom>
          Company Information
        </Typography>
        <Typography paragraph>
          Company Name: Jobless&Found
          <br />
          Address: 1234 Startup Avenue, Suite 567, Innovation City, 89012, USA
          <br />
          Email: info@joblessfound.com
          <br />
          Phone: +1 (800) 123-4567
          <br />
          VAT Number: US123456789
        </Typography>

        <Typography variant="h6" gutterBottom>
          Website Host
        </Typography>
        <Typography paragraph>
          Web Hosting Service: Cloud Services Inc.
          <br />
          Address: 789 Cloud St., Web Town, 67890, USA
          <br />
          Phone: +1 (888) 987-6543
        </Typography>

        <Typography variant="h6" gutterBottom>
          Intellectual Property
        </Typography>
        <Typography paragraph>
          All content on this website, including text, graphics, logos, and images, is the property of Jobless&Found or its content suppliers and is protected by intellectual property laws.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Liability Disclaimer
        </Typography>
        <Typography paragraph>
          The information on this website is provided &quot;as is&quot; without any guarantees of completeness, accuracy, or timeliness. Jobless&Found is not responsible for any errors or omissions, or for any damages arising from the use of this website.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Personal Data
        </Typography>
        <Typography paragraph>
          Jobless&Found may collect personal data through this website. Any personal data collected will be processed in accordance with applicable data protection laws.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Governing Law
        </Typography>
        <Typography paragraph>
          These legal notices are governed by the laws of the United States of America. Any disputes will be subject to the exclusive jurisdiction of the courts in the state of California.
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

export default LegalNotices;