import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import CssBaseline from '@mui/material/CssBaseline';
import AppRouter from './router/AppRouter';
import { BrowserRouter } from 'react-router';

function App() {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CssBaseline>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </CssBaseline>
    </LocalizationProvider>
  )
}

export default App
