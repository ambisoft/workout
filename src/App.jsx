import './App.css';

import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Routes from "./Routes";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => (
  <ThemeProvider theme={darkTheme}>
    <div className="App">
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  </ThemeProvider>
);

export default App;
