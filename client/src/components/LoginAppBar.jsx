import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

// A COMPONENT TO SHOW BUTTONS DEPENDING IF USER IS AUTHENTICATED OR NOT
// HAS LINKS TO DIFFERENT PAGES
// HAS LOGOUT IF USER IS NOT LOGIN

function logoutButton() {
  localStorage.removeItem('auth_token');
  window.location.href = '/';
}

let button; let
  button2;

if (window.location.href === 'localhost:3000/posts') {
  button2 = (
    <div />
  );
} else {
  button2 = (
    <div>
      <Button color="inherit" href="/posts" variant="outlined">To Posts Page</Button>
    </div>
  );
}

export default function LoginAppBar({ nameOfThePage, buttonName, buttonLocation }) {
  const authToken = localStorage.getItem('auth_token');

  if (!authToken) {
    button = <Button color="inherit" href={buttonLocation}>{buttonName}</Button>;
  } else {
    button = <Button color="inherit" className="logoutButton" onClick={logoutButton}>Logout</Button>;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar color="#e3f2fd">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          />
          <Typography variant="h6" component="div" textAlign="center" sx={{ flexGrow: 1 }}>
            {nameOfThePage}
          </Typography>
          {button2}
          {button}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
