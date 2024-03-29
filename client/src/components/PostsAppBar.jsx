import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useLocation } from 'react-router-dom'



export default function PostsAppBar({nameOfThePage, buttonName, buttonLocation}) {

    const authToken = localStorage.getItem("auth_token")
    let button

    if(!authToken) {
    button = <Button color="inherit" href={buttonLocation}>{buttonName}</Button>
    } else {
    button = <Button color="inherit">Logout</Button>
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
          >
          </IconButton>
          <Typography variant="h6" component="div" textAlign="center" sx={{ flexGrow: 1 }}>
            {nameOfThePage}
          </Typography>
          {button}
        </Toolbar>
      </AppBar>
    </Box>
  );
}