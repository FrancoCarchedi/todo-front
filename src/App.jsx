import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import CssBaseline from '@mui/material/CssBaseline';
import AppRouter from './router/AppRouter';
import { BrowserRouter } from 'react-router';
import AuthProvider from './auth/context/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {

  const queryClient = new QueryClient()

  return (
    
      <AuthProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline>
            <BrowserRouter>
              <QueryClientProvider client={queryClient}>
                <AppRouter />
              </QueryClientProvider>
            </BrowserRouter>
          </CssBaseline>
        </LocalizationProvider>
      </AuthProvider>
    
  )
}

export default App
