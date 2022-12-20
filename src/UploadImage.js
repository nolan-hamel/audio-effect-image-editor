//
//   Final Project - Audio Effect Image Editor
//   Author: Nolan Hamel 
//	 Date: 12/9/2022 
//
//   This file contains everything needed to handle uploading an image
//

import { Button } from '@mui/material';
import React, { useState } from 'react';
import HelpDialog from './HelpDialog';

export default function UploadImage({passToProcess}) {
    const [image, setImage] = useState(null)

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
            passToProcess(event.target.files[0])
        }
    }

    const CustomButton = () => {
        return(
            <Button component="label" variant="outlined" style={{alignSelf: "center"}}>
                Upload Image
                <input hidden type="file" accept="image/*" onChange={onImageChange} className="filetype" />
            </Button>
        )
    }

    if(image){
        return (
          <div style={{display: "flex", flexDirection: "column", width: "40vw", marginTop: "15vh"}}>
            <img id="inputImage" src={image} alt="" style={{ maxWidth: "40vw", maxHeight: "60vh",  marginBottom: 10, borderRadius: 5, border: "2px solid #AAAAAA", alignSelf:"center"}}/>
            <CustomButton/>
            <HelpDialog/>
          </div>
        )
    }
    return (
        <div style={{display: "flex", flexDirection: "column", width: "100vw"}}>
            <CustomButton/>
        </div>
    )
}