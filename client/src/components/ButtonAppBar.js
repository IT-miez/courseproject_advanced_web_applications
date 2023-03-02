import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
//import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom'



// A COMPONENT TO SHOW BUTTONS DEPENDING IF USER IS AUTHENTICATED OR NOT
// HAS LINKS TO DIFFERENT PAGES
// HAS LOGOUT IF USER IS NOT LOGIN



// PARSING FUNCTION FROM STACKOVERFLOW
// LINK: https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library
function parsejwttoken (jwt_token) {
  let base64Url = jwt_token.split('.')[1];
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  console.log("JSON TOKEN")
  console.log(jsonPayload)
  return JSON.parse(jsonPayload);
}



const authToken = localStorage.getItem("auth_token")
let button, button2, userProfileButton

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

  if(authToken) {
    let datatoken = parsejwttoken(authToken)
    console.log(datatoken.id)

    userProfileButton = (
      <div>
        <Link to={"/profile/"+datatoken.id} style={{textDecoration:"none", marginRight: 10}}>
          <Button className="profilePageButton" color="inherit" variant="outlined">{datatoken.email}</Button>
        </Link>
        
      </div>
    )
  }
  
  
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
  button = <Button color="inherit" className="logoutButton" onClick={logoutButton}>Logout</Button>
  
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
          {userProfileButton}
          {button2}
          {button}
        </Toolbar>
      </AppBar>
    </Box>
  );
}