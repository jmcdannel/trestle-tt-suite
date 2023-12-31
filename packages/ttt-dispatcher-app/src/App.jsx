import React, { useState } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from "react-router-dom";
import Box from '@mui/material/Box';

import theme from './theme';

import Header from './Core/Header';
import Footer from './Core/Footer';
import Modules from './Core/Modules';
import ApiEngine from './Core/ApiEngine';
// import JmriEngine from './Core/JmriEngine';
// import SensorEngine from './Core/SensorEngine';
// import jmriApi from './Shared/jmri/jmriApi';

import Store from './Store/Store';
import './App.scss';


// const dccApi = 'exJsApi'; // jmprApi;


function App() {

  const [jmriReady, setJmriReady] = useState(false);
  const [apiReady, setApiReady] = useState(false);

  return (
    <MuiThemeProvider theme={theme}>
      <Store>
        <CssBaseline />
        <BrowserRouter>
          <ApiEngine onReady={() => setApiReady(true)} />
          {/* <ApiEngine onReady={() => setApiReady(true)} />
          {apiReady && (<JmriEngine onReady={() => setJmriReady(true)} />)} */}
          {/* {jmriReady && (<SensorEngine jmriApi={jmriApi} />)} */}
          <Box 
            display="flex" 
            flexDirection="column" 
            height="100%" >
            <Box>
              <Header 
                apiReady={apiReady} 
              />
            </Box>
            <Box 
              className="disable-dbl-tap-zoom"
              flexGrow={1} 
              component="main" 
              display="flex" 
              alignContent="center" 
              mt={2
            }>
              <Modules />
            </Box>
            <Box mt={1}>
              <Footer />
            </Box>
          </Box>
        </BrowserRouter>
      </Store>
    </MuiThemeProvider>
  );
}

export default App;
