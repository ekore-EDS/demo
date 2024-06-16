import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import Routers from './routes';
import { AppStateProvider } from './state/provider';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Header from './components/Header/header';

const defaultTheme: any = createTheme();

function App() {
  // const pathPattern: any = window.location.pathname;
  // const { state } = useAppStateContext();
  
  return (
    <>
      <AppStateProvider>
        <BrowserRouter>
          <div className='h-100'>
            <ThemeProvider theme={defaultTheme}>
              <Suspense fallback={<div>Loading...</div>}>
              <Header />
              <div className='container'>
                <Routers />
              </div>
              {/* <Footer /> */}
              </Suspense>
            </ThemeProvider>
            
          </div>
        </BrowserRouter>
      </AppStateProvider>
    </>
  );
}

export default App;
