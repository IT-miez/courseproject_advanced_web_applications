//import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
//import InputLabel from '@mui/material/InputLabel';
//import Input from '@mui/material/Input';
//mport FormHelperText from '@mui/material/FormHelperText';
//import TextareaAutosize from '@mui/base/TextareaAutosize';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import Textarea from '@mui/joy/Textarea';





// A COMPONENT THAT IS RENDERED WHEN USER IS AUTHENTICATED
// TO ADD A POST
// NOT RENDERED IF NOT AUTHENTICATED
// CHECK IS DONE WHERE IT IS USED



function AddPostForm() {


    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        console.log({
            title: data.get("postTitle"),
            code: data.get("code")
        })
        console.log("Bearer "+ localStorage.getItem("auth_token"))
        // SEND TO SERVER ADDPOST ROUTE
        fetch("/user/addPost", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+ localStorage.getItem("auth_token")
            },
            body: JSON.stringify({
                "title": data.get("postTitle"),
                "code": data.get("code")
            }),
            
        })
        .then((response) => response.json())
        .then((data => {
            console.log("RESPONSE FROM ADDING POST")
            console.log(data)
        }))
    }



    return (
    <div>
        <Container maxWidth="sm">
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="postTitle"
                label="Post title"
                name="postTitle"
                autoFocus
            />
            <Textarea
                slotProps={{
                    textarea: {
                      id: 'code'
                }
                }}

                name="code"
                label="code"
                size="lg"
                margin="normal"
                required
                fullWidth
                
            />
            <Button
                type="submit"
                className="submitbutton"
                name="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Add post
            </Button>
            </Box>
        </Container>

    </div>
    );
}

export default AddPostForm;


