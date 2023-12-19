import * as React from 'react';
import ButtonAppBar from './ButtonAppBar';
import AddCommentForm from './AddCommentForm';
import Typography from '@mui/material/Typography';
import { CssBaseline } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'highlight.js/styles/github.css';
import LoadComments from './LoadComments';
const hljs = require('highlight.js');

// A COMPONENT TO SHOW A OPENED POST
// FETCHES THE POST FROM BACKEND
// IF USER IS AUTHENTICATED ADDS COMMENT FORM POSSIBILTY
// IF POST IS NOT FOUND SAYS IT ON THE PAGE
// RENDERES THE POST IF AVAILABLE AND FOUND FROM MONGODB DATABASE

const authToken = localStorage.getItem('auth_token');
let commentform;

if (!authToken) {
  commentform = (
    <div />
  );
} else {
  commentform = (
    <div>
      <AddCommentForm />
    </div>
  );
}

function PostOpened() {
  const [jsondata, setJsonData] = useState(null);

  const { postID } = useParams();
  console.log(postID);

  useEffect(() => {
    async function doStuff() {
      await fetch(`/user/posts/${postID}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          console.log('Logging post data');
          setJsonData(data);
        });
      document.querySelectorAll('div.code').forEach((el) => {
        // then highlight each
        hljs.highlightElement(el);
      });
    }

    doStuff();
  }, []);

  if (jsondata === null) {
    return (
      <div>
        <Typography variant="h2" component="h2" textAlign="center">
          Post not found
        </Typography>
      </div>
    );
  }

  return (
    <div>
      <CssBaseline />
      <ButtonAppBar />
      <Typography variant="h2" component="h2" textAlign="center" sx={{ mt: 2 }}>
        Posts
      </Typography>

      <div style={{ backroungColor: 'black' }}>
        <br />
        <Card sx={{ minWidth: 300, m: 2 }} variant="outlined" style={{ backgroundColor: '#e3f2fd' }}>
          <CardContent>
            <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
              {jsondata.title}
            </Typography>
            <div className="code">
              <pre>
                <code style={{ whiteSpace: 'pre-wrap' }}>
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
  );
}

export default PostOpened;
