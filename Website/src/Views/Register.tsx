import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AppTheme from '../Components/AppTheme';
import Link from '@mui/material/Link';
import { UserDTO } from '../API/Api';
import ColorModeIconDropdown from '../Components/Dashboard/ColorModeIconDropdown';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
        boxShadow: 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const RegisterContainer = styled(Stack)(({ theme }) => ({
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage: 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage: 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));

const addUser = async (newUser: UserDTO): Promise<UserDTO> => {
    const response = await fetch('http://localhost:5000/api/User/AddUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
    });

    if (!response.ok) {
        const errorDetails = await response.text(); // Récupère le corps de la réponse
        console.error('Error details:', errorDetails); // Affiche les détails de l'erreur
        throw new Error('Error adding user');
    }

    const addedUser = await response.json();
    return addedUser;
};


export default function Register(props: { disableCustomTheme?: boolean }) {
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = React.useState('');
    const [fnameError, setFnameError] = React.useState(false);
    const [fnameErrorMessage, setFnameErrorMessage] = React.useState('');
    const [lnameError, setLnameError] = React.useState(false);
    const [lnameErrorMessage, setLnameErrorMessage] = React.useState('');
    const [phoneError, setPhoneError] = React.useState(false);
    const [phoneErrorMessage, setPhoneErrorMessage] = React.useState('');

    const generateCurl = (url: string, method: string, headers: Record<string, string>, body: object) => {
        const headerLines = Object.entries(headers)
            .map(([key, value]) => `-H "${key}: ${value}"`)
            .join(' ');
        return `curl -X ${method} ${headerLines} -d '${JSON.stringify(body)}' ${url}`;
    };

    const validateInputs = () => {
        const email = document.getElementById('email') as HTMLInputElement;
        const password = document.getElementById('password') as HTMLInputElement;
        const confirmPassword = document.getElementById('confirm-password') as HTMLInputElement;
        const fname = document.getElementById('fname') as HTMLInputElement;
        const lname = document.getElementById('lname') as HTMLInputElement;
        const phone = document.getElementById('phone') as HTMLInputElement;

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        let isValid = true;

        // Validation du prénom
        if (!fname.value) {
            setFnameError(true);
            setFnameErrorMessage('First name is required.');
            isValid = false;
        } else {
            setFnameError(false);
            setFnameErrorMessage('');
        }

        // Validation du nom de famille
        if (!lname.value) {
            setLnameError(true);
            setLnameErrorMessage('Last name is required.');
            isValid = false;
        } else {
            setLnameError(false);
            setLnameErrorMessage('');
        }

        // Validation du numéro de téléphone
        if (!phone.value || !/^\d{10}$/.test(phone.value)) {
            setPhoneError(true);
            setPhoneErrorMessage('Please enter a valid phone number (10 digits).');
            isValid = false;
        } else {
            setPhoneError(false);
            setPhoneErrorMessage('');
        }

        // Validation de l'email
        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        // Validation du mot de passe
        if (!password.value || !passwordRegex.test(password.value)) {
            setPasswordError(true);
            setPasswordErrorMessage('Password must be at least 6 characters long, include 1 uppercase letter, 1 number, and 1 special character.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        // Validation de la confirmation du mot de passe
        if (!confirmPassword.value || confirmPassword.value !== password.value) {
            setConfirmPasswordError(true);
            setConfirmPasswordErrorMessage('Passwords do not match.');
            isValid = false;
        } else {
            setConfirmPasswordError(false);
            setConfirmPasswordErrorMessage('');
        }

        return isValid;
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        if (!validateInputs()) {
            return;
        }
    
        const data = new FormData(event.currentTarget);
    
        // Récupérer les valeurs du formulaire
        const email = data.get('email')?.toString() || '';
        const password = data.get('password')?.toString() || '';
        const firstName = data.get('fname')?.toString() || '';
        const lastName = data.get('lname')?.toString() || '';
        let phoneNumber = data.get('phone')?.toString() || '';
    
        // Formatage du numéro de téléphone
        if (phoneNumber.startsWith('0')) {
            phoneNumber = '+33' + phoneNumber.substring(1);
        }
    
        const newUser: UserDTO = {
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
            countryCode: 1,
            userTypeId: 1,
        };
        console.log(newUser);

        const curlCommand = generateCurl(
            'http://localhost:5000/api/User/AddUser',
            'POST',
            {
                'Content-Type': 'application/json',
            },
            newUser
        );
    
        // Appeler l'API pour ajouter l'utilisateur
        addUser(newUser)
        .then(response => {
            console.log('Utilisateur ajouté avec succès:', response);
            // Gérer le succès, par exemple rediriger l'utilisateur
        })
        .catch(error => {
            console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
            console.log(phoneNumber);
            console.error('cURL command:', curlCommand);
        });
    };
    

    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "1%",
                }}
            >
                <Link
                    href="/"
                    variant="h6"
                    sx={{
                        display: "flex",
                        color: '#3E63DD',
                        '&:hover': {
                            color: '#004074',
                        },
                    }}
                >
                    <ArrowBackIcon sx={{ paddingRight: "3px" }} /> Return home
                </Link>
                <ColorModeIconDropdown />
            </Box>
            <RegisterContainer direction="column" justifyContent="space-between">
                <Card variant="outlined">
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                    >
                        Registration
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            gap: 2,
                        }}
                    >
                        <FormControl error={fnameError}>
                            <FormLabel htmlFor="fname">First Name</FormLabel>
                            <TextField
                                id="fname"
                                type="text"
                                name="fname"
                                placeholder="Jean"
                                required
                                fullWidth
                                variant="outlined"
                                helperText={fnameError ? fnameErrorMessage : ''}
                            />
                        </FormControl>

                        <FormControl error={lnameError}>
                            <FormLabel htmlFor="fname">Last Name</FormLabel>
                            <TextField
                                id="lname"
                                type="text"
                                name="lname"
                                placeholder="Doe"
                                required
                                fullWidth
                                variant="outlined"
                                helperText={lnameError ? lnameErrorMessage : ''}
                            />
                        </FormControl>

                        <FormControl error={emailError}>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <TextField
                                id="email"
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                                required
                                fullWidth
                                variant="outlined"
                                helperText={emailError ? emailErrorMessage : ''}
                            />
                        </FormControl>

                        <FormControl error={phoneError}>
                            <FormLabel htmlFor="phone">Phone Number</FormLabel>
                            <TextField
                                id="phone"
                                type="tel"
                                name="phone"
                                placeholder="0658986593"
                                required
                                fullWidth
                                variant="outlined"
                                helperText={phoneError ? phoneErrorMessage : ''}
                            />
                        </FormControl>

                        <FormControl error={passwordError}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <FormLabel htmlFor="password">Password</FormLabel>
                            </Box>
                            <TextField
                                name="password"
                                placeholder="••••••"
                                type="password"
                                id="password"
                                required
                                fullWidth
                                variant="outlined"
                                helperText={passwordError ? passwordErrorMessage : ''}
                            />
                        </FormControl>

                        <FormControl error={confirmPasswordError}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <FormLabel htmlFor="confirm-password">Confirm Password</FormLabel>
                            </Box>
                            <TextField
                                name="confirm-password"
                                placeholder="••••••"
                                type="password"
                                id="confirm-password"
                                required
                                fullWidth
                                variant="outlined"
                                helperText={confirmPasswordError ? confirmPasswordErrorMessage : ''}
                            />
                        </FormControl>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                        >
                            Register
                        </Button>
                    </Box>
                </Card>
            </RegisterContainer>
        </AppTheme>
    );
}