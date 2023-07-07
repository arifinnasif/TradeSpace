import './App.css';
import Signup from './components/Signup';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// const defaultTheme = createTheme();
const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#00bfa5',
    },
    secondary: {
      main: '#00bfa5',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
      <CssBaseline />
        <Signup />
      </Container>
    </ThemeProvider>
  );
}

export default App;
