import * as React from 'react';

import Typography from '@mui/material/Typography';
import { CssBaseline } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ButtonAppBar from './ButtonAppBar';

// A COMPONENT TO SHOW A USERS PROFILE IS THE USER HAS LOGON
// IF NOT DOESNT LOAD ANYTHING USEFUL TO THE PAGE, ONLY SOME TEXT THAT NOT FOUND

function ProfilePage() {
  const [jsondata, setJsonData] = useState(null);

  const { userID } = useParams();
  console.log(userID);
  console.log(`/user/profile/${userID}`);
  useEffect(() => {
    async function doStuff() {
      console.log('FUNKTIO');
      await fetch(`/user/profile/${userID}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          console.log('Logging profile data');
          setJsonData(data);
        });
      console.log('DONE');
    }

    doStuff();
  }, []);

  if (jsondata === null) {
    return (
      <div>
        <ButtonAppBar />
        <Typography variant="h2" component="h2" textAlign="center">
          Profile not found
        </Typography>
      </div>
    );
  }

  return (
    <div>
      <CssBaseline />
      <ButtonAppBar />
      <Typography variant="h2" component="h2" textAlign="center" sx={{ mt: 2 }}>
        Profile page
      </Typography>

      <div style={{ backroungColor: 'black' }}>
        <br />
        <Card sx={{ minWidth: 300, m: 2 }} variant="outlined" style={{ backgroundColor: '#e3f2fd' }}>
          <CardContent>
            <Typography sx={{ fontSize: 20 }} color="text.secondary">
              <strong>User</strong>
              :
              {jsondata.email}
            </Typography>

            <br />
            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
              <strong>BIO</strong>
              :
              <br />
              {jsondata.bio}
            </Typography>
            <br />
            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
              <strong>Creation date:</strong>
              :
              <br />
              {jsondata.creationdate}
            </Typography>

          </CardContent>
        </Card>
      </div>

    </div>
  );
}

export default ProfilePage;
