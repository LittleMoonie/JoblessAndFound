import { autocompleteClasses, Box, Button, Card, CardContent, Grid } from '@mui/material';
import React from 'react';
import monImage from '../Assets/logo.png';
import bgImage from '../Assets/bgMontains.png';
import Typography from '@mui/material/Typography';
import { ReactComponent as Compass } from '../Assets/compass.svg';
import { ReactComponent as Bag } from '../Assets/bag.svg';
import { ReactComponent as Scroll } from '../Assets/scroll.svg';

function LandingPage() {
    return (
        <Box
            sx={{
                margin: "auto",
                backgroundColor: "#1F1B1A",
            }}
        >
            <Box sx={{
                padding: { xs: "20px", sm: "40px", md: "60px" }, // Padding responsive
            }}>
                <Box
                    sx={{
                        width: "80%",
                        maxWidth: "70%",
                        margin: "auto",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {/* --- Header --- */}
                    <Box
                        component="img"
                        sx={{
                            width: { xs: 250, sm: 300, md: 400 },  // Largeur responsive
                            height: { xs: 250, sm: 300, md: 400 }, // Hauteur responsive
                            borderRadius: '8px',
                        }}
                        alt="Description de l'image"
                        src={monImage}
                    />

                    {/* Texte avec typographie responsive */}
                    <Typography
                        sx={{
                            fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" },  // Taille du texte responsive
                            width: "100%",
                            color: "#F1BC60",
                            fontWeight: "bold",
                            textAlign: "center",
                            marginTop: "20px",
                        }}
                    >
                        Because job searching is an adventure, every connection can be a new opportunity.
                    </Typography>

                    <Button size="large"
                        sx={{
                            backgroundColor: "#352D26",
                            fontSize: { xs: "1rem", sm: "1.3rem", md: "1.7rem" },
                            color: "#F6C05E",
                            width: { xs: "40%", sm: "30%", md: "20%" },
                            margin: "20px 0px 20px 0",
                            '&:hover': {
                                backgroundColor: '#D49C4E',
                                color: "#352D26"
                            },
                        }}
                        href='/register'
                    >Join us</Button>
                </Box>
            </Box>

            {/* --- Main - Section 1 --- */}

            <Box
                sx={{
                    width: '100%',
                    height: '90vh',
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={{
                        width: "60%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" },  // Taille du texte responsive
                            width: "100%",
                            color: "#352D26",
                            fontWeight: "bold",
                            textAlign: "center",
                            // margin: "20px 0px 20px 0px",
                        }}
                    >
                        Find your next step, grow your network, and unlock your full potential with Jobless & Found.
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-evenly",
                        }}
                    >
                        <Button size="large"
                            sx={{
                                backgroundColor: "#352D26",
                                fontSize: { xs: "1rem", sm: "1.3rem", md: "1.7rem" },
                                color: "#F6C05E",
                                width: { xs: "40%", sm: "30%", md: "20%" },
                                '&:hover': {
                                    backgroundColor: '#D49C4E',
                                    color: "#352D26"
                                },
                            }}
                            href='/login'
                        >Sign In</Button>

                        <Typography
                            sx={{
                                fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" },
                                color: "#352D26",
                                fontWeight: "bold",
                                textAlign: "center",
                            }}
                        >
                            OR
                        </Typography>

                        <Button size="large"
                            sx={{
                                backgroundColor: "#352D26",
                                fontSize: { xs: "1rem", sm: "1.3rem", md: "1.7rem" },
                                color: "#F6C05E",
                                width: { xs: "40%", sm: "30%", md: "20%" },
                                '&:hover': {
                                    backgroundColor: '#D49C4E',
                                    color: "#352D26"
                                },
                            }}
                            href='/register'
                        >Register</Button>
                    </Box>
                </Box>
            </Box>

            {/* --- Main - Section 2 --- */}
            <Box sx={{
                padding: { xs: "20px", sm: "40px", md: "60px" }, // Padding responsive
                width: "80%",
                margin: "auto",
                display: "flex",
                justifyContent: "space-between",
                marginTop: "4%",
            }}>

                <Card
                    sx={{
                        backgroundColor: "#F1BC61",
                        width: "40%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"

                    }}
                >
                    <CardContent
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Box sx={{
                            width: { xs: "3rem", sm: "5rem", md: "7rem" },  // Largeur responsive pour différentes tailles d'écran
                            height: { xs: "3rem", sm: "5rem", md: "7rem" }, // Hauteur responsive pour différentes tailles d'écran
                        }} >
                            <Compass width="100%" height="100%" />
                        </Box>


                        <Typography
                            sx={{
                                fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" },  // Taille du texte responsive
                                width: "100%",
                                fontWeight: "bold",
                                textAlign: "center",
                                margin: "3rem 0 3rem 0"
                            }}
                        >
                            Find your way in the world of work thanks to our many opportunities
                        </Typography>

                    </CardContent>
                </Card>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "55%",
                        justifyContent: "space-between"
                    }}
                >

                    <Card
                        sx={{
                            backgroundColor: "#F1BC61",
                            height: "48%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <CardContent
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Box sx={{
                                width: { xs: "3rem", sm: "5rem", md: "7rem" },  // Largeur responsive pour différentes tailles d'écran
                                height: { xs: "3rem", sm: "5rem", md: "7rem" }, // Hauteur responsive pour différentes tailles d'écran
                            }} >
                                <Bag width="100%" height="100%" />
                            </Box>

                            <Typography
                                sx={{
                                    fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" },  // Taille du texte responsive
                                    width: "100%",
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    margin: "2rem 0 2rem 0"
                                }}
                            >
                                Store all the documents you consider necessary for your job application
                            </Typography>

                        </CardContent>
                    </Card>

                    <Card
                        sx={{
                            backgroundColor: "#F1BC61",
                            height: "48%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <CardContent
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Box sx={{
                                width: { xs: "3rem", sm: "5rem", md: "7rem" },  // Largeur responsive pour différentes tailles d'écran
                                height: { xs: "3rem", sm: "5rem", md: "7rem" }, // Hauteur responsive pour différentes tailles d'écran
                            }} >
                                <Scroll width="100%" height="100%" />
                            </Box>

                            <Typography
                                sx={{
                                    fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" },  // Taille du texte responsive
                                    width: "100%",
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    margin: "2rem 0 2rem 0"
                                }}
                            >
                                Sign your contract as soon as the company validates your application
                            </Typography>

                        </CardContent>
                    </Card>

                </Box>

            </Box>

            {/* --- Main - Section 3 --- */}

            <Box sx={{
                backgroundColor: "#F1BC61",
                marginTop: "4%",
            }} >
                <Typography
                    sx={{
                        fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" }, // Taille du texte responsive
                        width: "100%",
                        fontWeight: "bold",
                        textAlign: "center",
                        paddingTop: "5%",
                        paddingBottom: "2%"
                    }}
                >
                    Our Partners

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            flexWrap: "wrap",
                            alignContent: "center",
                            paddingTop: "5%",
                            paddingBottom: "8%"
                        }}
                    >
                        <img src="https://placehold.co/150x150" alt="" style={{
                            borderRadius: "100%",
                            width: "15%",
                        }} />

                        <img src="https://placehold.co/150x150" alt="" style={{
                            borderRadius: "100%",
                            width: "15%",
                        }} />

                        <img src="https://placehold.co/150x150" alt="" style={{
                            borderRadius: "100%",
                            width: "15%",
                        }} />

                        <img src="https://placehold.co/150x150" alt="" style={{
                            borderRadius: "100%",
                            width: "15%",
                        }} />

                        <img src="https://placehold.co/150x150" alt="" style={{
                            borderRadius: "100%",
                            width: "15%",
                        }} />

                    </Box>

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
                        <Box
                            component="img"
                            src={monImage} // Remplacer par l'URL correcte de l'image
                            alt="Jobless & Found"
                            sx={{
                                width: { xs: "50%", md: "80%" }, // Largeur de l'image pour mobile et desktop
                                marginBottom: { xs: "1rem", md: "0" },
                            }}
                        />
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
                            Contactez-nous sur jobless@found.com et nous vous répondrons dans les plus brefs délais !
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
                            SERVICE CLIENT
                        </Typography>
                        <Typography>Problème avec mon compte</Typography>
                        <Typography>Je sais pas</Typography>
                        <Typography>Aucune idée</Typography>
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
                            AUTRE
                        </Typography>
                        <Typography>Conditions générales de vente</Typography>
                        <Typography>Politique de confidentialité</Typography>
                        <Typography>Mentions légales</Typography>
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
                        2024 - Tous droits réservés
                    </Typography>
                </Box>
            </Box>

        </Box>

    );
}

export default LandingPage;