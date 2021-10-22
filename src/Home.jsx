import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Home = () => (
  <header className="App-header">
    <h1>Run Forrest Run</h1>
    <img src='/logo.png' alt='Running man logo' />
    <p>
      <Button component={Link} to='/join' variant="contained" color='success' size='large'>
        Join Beta
      </Button>
    </p>
  </header>
);

export default Home;
