import './App.css';

import Button from '@mui/material/Button';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Run Forrest Run</h1>
        <img src='/logo.png' alt='Running man logo' />
        <p>
        <Button variant="contained" color='success' size='large'>
          Join Beta
        </Button>
        </p>
      </header>
    </div>
  );
}

export default App;
