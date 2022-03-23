import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Menu from "./pages/Menu/Menu"
import Import from "./pages/Import/Import"
import Options from "./pages/Options/Options"
import Questions from "./pages/Questions/Questions"
import Results from "./pages/Results/Results"
import NotFound from "./pages/NotFound/NotFound"

const theme = createTheme({
  palette: {
    primary: {
      main: '#6db1ff',
      contrastText: '#f2f3f5',
    },
    background: {
      default: '#f2f3f5',
    }
  },
  components: {
    MuiContainer: {
      variants: [
        {
          props: { variant: 'main' },
          style: {
            minHeight: '50px'
          }
        }
      ]
    }
  }

})


function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />{
          <Router>
            <Routes>
              <Route path="/" element={<Menu />} />
              <Route path="/import" element={<Import />} />
              <Route path="/options" element={<Options />} />
              <Route path="/questions" element={<Questions />} />
              <Route path="/results" element={<Results />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        }
      </ThemeProvider>
    </>
  );
}

export default App;
