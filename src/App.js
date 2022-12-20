//
//   Final Project - Audio Effect Image Editor
//   Author: Nolan Hamel 
//	 Date: 12/9/2022 
//
//   This is the main file that contains the basic structure
//

import React, { useState } from 'react';
import { ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import UploadImage from './UploadImage';
import ProcessImage from './ProcessImage';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  }
});

function App() {
  const [image, setImage] = useState('');

  const handleImageData = (data) => {
    setImage(data)
  }

  return (
    <ThemeProvider theme={darkTheme} className="App">
      <CssBaseline/>
      <div className="outer">
        <div className="inner">
          <UploadImage passToProcess={handleImageData}/>
          <ProcessImage image={image}/>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
