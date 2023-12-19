import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Textarea from '@mui/joy/Textarea';
import LoginAppBar from './LoginAppBar';
// REGISTER PAGE
// USER CAN REGISTER
// NEEDS EMAIL, PASSWORD AND BIO
// CREATION DATE IS SAVED TO DATABASE

function storeToken(token) {
  localStorage.setItem('auth_token', token);
}

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>
      {' '}
      {new Date().getFullYear()}
      .
    </Typography>
  );
}

const theme = createTheme();

export default function Register() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    // SEND TO SERVER LOGIN ROUTE
    fetch('/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.get('email'),
        password: data.get('password'),
        bio: data.get('bio'),
      }),

    })
      .then((response) => response.json())
      .then((data) => {
        console.log('REGISTER FETCH OUTPUT');
        console.log(`data token: ${data.token}`);
        if (data.token) {
          console.log(data.token);
          storeToken(data.token);
          // window.location.href="/";
        } else {
          console.log('NO TOKEN GIVEN');
          if (data.msg == 'register worked') {
            window.location.href = '/login';
          }
        }
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <LoginAppBar nameOfThePage="Register page" buttonName="to Login" buttonLocation="/login" />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="bio"
              label="bio"
              type="bio"
              id="bio"
            />

            <Button
              type="submit"
              id="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/login" variant="body2">
                  Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
