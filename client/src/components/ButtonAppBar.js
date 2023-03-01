import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
//import MenuIcon from '@mui/icons-material/Menu';
//import { useLocation } from 'react-router-dom'


const authToken = localStorage.getItem("auth_token")
let button, button2

if(window.location.href === "localhost:3000/posts") {
  button2 = (
    <div>

    </div>
  )
} else {
  button2= (
    <div>
      <Button color="inherit" href="/posts" variant="outlined">To Posts Page</Button>
    </div>
  )
}


/*
function Test() {
  const location = useLocation();
  console.log(location.pathname)
  return <span>Path : "{location.pathname}"</span>
}
*/

function logoutButton() {
  localStorage.removeItem("auth_token")
  document.location.reload()
}

if(!authToken) {
  button = (
    <div>
      <Button color="inherit" href="/login">to Login</Button>
      <Button color="inherit" href="/register">To register</Button>
    </div>
  )

  
} else {
  button = <Button color="inherit" onClick={logoutButton}>Logout</Button>
}

export default function ButtonAppBar() {
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Code Posts Website
          </Typography>
          {button2}
          {button}
        </Toolbar>
      </AppBar>
    </Box>
  );
}