import * as React from 'react';

import Typography from '@mui/material/Typography';
import { CssBaseline } from '@mui/material';
//import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
//import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
//import Button from '@mui/material/Button';

import {useState, useEffect } from "react"

import { useParams } from "react-router-dom"

// COMPONENT IMPORTS
import ButtonAppBar from './ButtonAppBar';
// COMPONENT IMPORTS DONE



//const authToken = localStorage.getItem("auth_token")
//let commentform



function ProfilePage() {

    let [jsondata, setJsonData] = useState(null)

    let { userID } = useParams()
    console.log(userID)
    console.log("/user/profile/"+userID)
    useEffect(() => {
        async function doStuff() {
            console.log("FUNKTIO")
            await fetch("/user/profile/"+userID, {
                headers: {
                    "Authorization": "Bearer "+ localStorage.getItem("auth_token")
                },
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                console.log("Logging profile data")
                setJsonData(data)
            })
            console.log("DONE")
        }

        doStuff()

    }, [])

    if(jsondata === null) {
        
        return (
            <div>
            <ButtonAppBar />
            <Typography variant="h2" component="h2" textAlign={"center"}>
                Profile not found
            </Typography>
            </div>
        )
    }

    //9bc0ff
    //e3f2fd

    return (
        <div>
            <CssBaseline />
            <ButtonAppBar />
            <Typography variant="h2" component="h2" textAlign={"center"} sx={{mt: 2}}>
                Profile page
            </Typography>

            <div style={{backroungColor: "black"}}>
                <br />
                <Card sx={{ minWidth: 300, m: 2}} variant="outlined"  style={{backgroundColor: "#e3f2fd"}}>
                    <CardContent>
                        <Typography sx={{ fontSize: 20 }} color="text.secondary" >
                        <strong>User</strong>: {jsondata.email}
                        </Typography>
                        
                        <br />
                        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                            <strong>BIO</strong>: <br />
                            {jsondata.bio}
                        </Typography>
                        <br />
                        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                            <strong>Creation date:</strong>: <br />
                            {jsondata.creationdate}
                        </Typography>

                    </CardContent>
                </Card>
            </div>
                
                
                


        </div>
    )
}



export default ProfilePage