import * as React from 'react';
import Typography from '@mui/material/Typography';
import { CssBaseline } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { Link, redirect, useParams } from 'react-router-dom';
import AddPostForm from './AddPostForm';
import ButtonAppBar from './ButtonAppBar';
import 'highlight.js/styles/github.css';
const hljs = require('highlight.js');

// A COMPONENT TO SHOW ALL AVAILABLE POSTS
// RENDERS ADD POST -FORM IF USER IS AUTHENTICATED

function PostsPage() {
  const [jsondata, setJsonData] = useState(null);

  useEffect(() => {
    async function doStuff() {
      await fetch('/user/getPosts')
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          console.log('Logging b');
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
        <h1>Not loaded yet</h1>
      </div>
    );
  }

  // CHECK IF USER HAS LOGINNED
  // IF NOT, ADDING POSTS IS NOT POSSIPLE
  const authToken = localStorage.getItem('auth_token');
  let postform;

  if (!authToken) {
    postform = (
      <div />
    );
  } else {
    postform = (
      <div>
        <AddPostForm />
      </div>
    );
  }

  // LOGIN CHECK DONE

  return (
    <div>
      <CssBaseline />
      <ButtonAppBar />
      <Typography variant="h2" component="h2" textAlign="center" sx={{ mt: 2 }}>
        Posts
      </Typography>
      {postform}
      {jsondata.map((item, itemindex) => (
        <div style={{ backroungColor: 'black' }}>
          <br />

          <Card sx={{ minWidth: 300, m: 2 }} key={item._id + 1} variant="outlined" style={{ backgroundColor: '#e3f2fd' }}>
            <CardContent>
              <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                {item.title}
              </Typography>
              <div className="code">
                <pre>
                  <code style={{ whiteSpace: 'pre-wrap' }}>
                    {item.code}
                  </code>
                </pre>
              </div>

              <br />
            </CardContent>
            <CardActions>
              <Link to={`/posts/${item._id}`} key={item._id} id={item._id} style={{ textDecoration: 'none' }}>
                <Button size="small">Open post</Button>
              </Link>
            </CardActions>
          </Card>

        </div>
      ))}

    </div>
  );
}

export default PostsPage;
