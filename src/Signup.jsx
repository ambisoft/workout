import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Signup = () => (
  <header className="App-header">
    <h1>Hooray! You're about to join our beta</h1>
    <h3>Hush hush - right now we are invite only</h3>
    <TextField id="access-code" label="Enter your access code" />
    <p>
    <Button variant="contained" color='success' size='large'>
      Submit
    </Button>
    </p>
  </header>
);

export default Signup;
