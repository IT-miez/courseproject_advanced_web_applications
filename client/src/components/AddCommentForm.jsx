import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import { useParams } from 'react-router-dom';

// A COMPONENT THAT IS RENDERED WHEN USER IS AUTHENTICATED
// TO ADD A COMMENT TO A POST
// NOT RENDERED IF NOT AUTHENTICATED
// CHECK IS DONE WHERE IT IS USED

function AddCommentForm() {
  const { postID } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      comment: data.get('comment'),
    });
    console.log(`Bearer ${localStorage.getItem('auth_token')}`);

    console.log(`POST ID IS ${postID}`);

    // SEND TO SERVER ADD COMMENT -ROUTE
    fetch(`/user/addComment/${postID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      },
      body: JSON.stringify({
        commentToPost: postID,
        comment: data.get('comment'),
      }),

    })
      .then((response) => response.json())
      .then(((data) => {
        console.log('RESPONSE FROM ADDING COMMENT');
        if (data.msg === 'comment added') {
          document.location.reload();
        } else {
          console.log(data);
        }
      }));
  };

  return (
    <div>
      <Container maxWidth="sm">
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Textarea
            size="lg"
            margin="normal"
            required
            fullWidth
            name="comment"
            label="comment"
            slotProps={{
              textarea: {
                id: 'comment',
              },
            }}
          />
          <Button
            type="submit"
            id="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add Comment
          </Button>
        </Box>
      </Container>

    </div>
  );
}

export default AddCommentForm;
