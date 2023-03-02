import * as React from 'react';

import Typography from '@mui/material/Typography';
//import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
//import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
//import Button from '@mui/material/Button';

import {useState, useEffect } from "react"

import { useParams } from "react-router-dom"
import Paper from '@mui/material/Paper';

// COMPONENT IMPORTS
// COMPONENT IMPORTS DONE

// A COMPONENT TO LOAD ALL COMMENTS OF A POST
// FETCHES COMMENTS FROM BACKEND AND USES MAP FUNCTION TO RENDER THEM TO A CARD COMPONENT
// SAYS COMMENTS NOT FOUND IF NO COMMENTS AVAILABLE


function LoadComments() {

    let [jsondata, setJsonData] = useState(null)

    let { postID } = useParams()
    console.log(postID)

    useEffect(() => {
        async function doStuff() {
            await fetch("/user/posts/"+postID+"/comments")
            .then(response => response.json())
            .then(data => {
                console.log(data)
                console.log("Logging comments data")
                setJsonData(data)
            })

        }

        doStuff()

    }, [])

    if(jsondata === null) {
        
        return (
            <div>
            <Typography variant="h2"  component="h2" textAlign={"center"}>
                Comments not found
            </Typography>
            </div>
        )
    }



    return (
        <div>
            <div style={{backroungColor: "black"}}>
                <br />
                <Paper variant="outlined">
                    {jsondata.map(item => 
                     <Card sx={{ minWidth: 300, m: 2 }}  style={{backgroundColor: "#9bc0ff"}}>
                        <CardContent>
                            <Typography sx={{ fontSize: 16 }} color="text.secondary">
                                {item.comment}
                            </Typography>                      
                        </CardContent>
                    </Card>   
                    )
                    }
                    
                </Paper>
                
            </div>
                
                
                


        </div>
    )
}



export default LoadComments