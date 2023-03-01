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
import AddCommentForm from "./AddCommentForm"
// COMPONENT IMPORTS DONE
import "highlight.js/styles/github.css";
import LoadComments from './LoadComments';



// hightlight.js import
const hljs = require('highlight.js');

// highlight.js import done



const authToken = localStorage.getItem("auth_token")
let commentform

if(!authToken) {
    commentform = (
      <div>
      </div>
    )
  } else {
    commentform= (
      <div>
        <AddCommentForm />
      </div>
    )
  }





function PostOpened() {

    let [jsondata, setJsonData] = useState(null)

    let { postID } = useParams()
    console.log(postID)

    useEffect(() => {
        async function doStuff() {
            await fetch("/user/posts/"+postID)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                console.log("Logging post data")
                setJsonData(data)
            })
            document.querySelectorAll('div.code').forEach(el => {
                // then highlight each
                hljs.highlightElement(el);
            })
        }

        doStuff()

    }, [])

    if(jsondata === null) {
        
        return (
            <div>
            <Typography variant="h2" component="h2" textAlign={"center"}>
                Post not found
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
                Posts
            </Typography>

            <div style={{backroungColor: "black"}}>
                <br />
                <Card sx={{ minWidth: 300, m: 2 }} variant="outlined"  style={{backgroundColor: "#e3f2fd"}}>
                    <CardContent>
                        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                        {jsondata.title}
                        </Typography>
                            <div className="code">
                                <pre>
                                    <code style={{whiteSpace: "pre-wrap"}}>
                                    {jsondata.code}
                                    </code>
                                </pre>
                            </div>
                            
                        <br />
                    </CardContent>
                </Card>
                <LoadComments />
                {commentform}
            </div>
                
                
                


        </div>
    )
}



export default PostOpened