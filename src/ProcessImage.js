//
//   Final Project - Audio Effect Image Editor
//   Author: Nolan Hamel 
//	 Date: 12/9/2022 
//
//   This file contains everything needed to process the image
//

import { Button, FormControl, Input, InputLabel, MenuItem, Select, Slider, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';

export default function ProcessImage({image}) {
    const [imgWidth, setWidth] = React.useState(0)
    const [imgHeight, setHeight] = React.useState(0)
    const [effect, setEffect] = React.useState("echo");

    const handleEffectChange = (event) => {
        setEffect(event.target.value);
    };

    // Echo settings
    const [sampleOffset, setSampleOffset] = React.useState(300);
    const [gFB, setGainFeedBack] = React.useState(0.2);
    const [gFF, setGainFeedForward] = React.useState(0.8);

    const handleSampleChange = (event) => {setSampleOffset(event.target.value);};
    const handleGFBChange = (event, newValue) => {setGainFeedBack(newValue);};
    const handleGFFChange = (event, newValue) => {setGainFeedForward(newValue);};
    
    const applyEchoEffect = (ctx, data) => {
        const inPixels = data.data
        let outPixels = new Int16Array(data.data)
        const imageSize = outPixels.length
        const pixelOffset = sampleOffset*4;

        var max = 0
        for(var i = 0; i <= imageSize; i += 1){
            if(i-pixelOffset >= 0){
                outPixels[i] = gFB*outPixels[i-pixelOffset]+inPixels[i]+(gFF-gFB)*inPixels[i-pixelOffset]
            } else{
                outPixels[i] = gFB*outPixels[i]+inPixels[i]+(gFF-gFB)*inPixels[i]
            }
            if(outPixels[i] > max) max = outPixels[i];
        }

        // normalize the image
        var ratio = max/255;
        outPixels = outPixels.map(v => Math.round(v / ratio));

        // store as output
        let newImage = new ImageData(new Uint8ClampedArray(outPixels), data.width, data.height)
        ctx.putImageData(newImage, 0, 0)
    };

    // Distortion Settings
    const [clippingLevel, setClippingLevel] = React.useState(0.8)
    const [makeupGain, setMakeupGain] = React.useState(0.8)

    const handleClipChange = (event, newValue) => {setClippingLevel(newValue);};
    const handleMakeupGainChange = (event, newValue) => {setMakeupGain(newValue);};

    const applyDistortionEffect = (ctx, data) => {
        const inPixels = data.data
        let outPixels = new Int16Array(data.data)
        const imageSize = outPixels.length

        const clampVal = Math.floor(255-255*clippingLevel);
        for(var i = 0; i <= imageSize; i += 1){
            if(inPixels[i] >= clampVal) {
                outPixels[i] = clampVal;
                outPixels[i] += makeupGain*(255-outPixels[i]);
            }
        }

        // store as output
        let newImage = new ImageData(new Uint8ClampedArray(outPixels), data.width, data.height)
        ctx.putImageData(newImage, 0, 0)
    };

    // Chorus Settings
    const [chorusGain, setChorusGain] = React.useState(0.75)
    const [frequency, setFrequency] = React.useState(10)
    const [chorusDelaySamples, setChorusDelaySamples] = React.useState(50)
    const [sweepWidth, setSweepWidth] = React.useState(100)

    const handleChorusSampleChange = (event) => {setChorusDelaySamples(event.target.value);};
    const handleFrequencyChange = (event) => {setFrequency(event.target.value);};
    const handleChorusGainChange = (event, newValue) => {setChorusGain(newValue);};
    const handleSweepWidthChange = (event) => {setSweepWidth(event.target.value);};

    const applyChorusEffect = (ctx, data) => {
        const inPixels = data.data
        let outPixels = new Int16Array(data.data)
        const imageSize = outPixels.length
        var max = 0
        var phase = 0
        for(var n = 0; n <= imageSize; n += 4){
            // calcualte lfo value
            let lfo = (0.5 + 0.5 * Math.sin(2.0 * Math.PI * phase))

            // calculate total Delay amount
            let totalDelay = Math.round(chorusDelaySamples + ((sweepWidth/2) * (1 + lfo))) 
            
            // make sure the delay applies across same channels
            totalDelay = totalDelay - totalDelay%4

            // apply the delay to pixel
            for(var i = n; i <= n+3; i++) {
                outPixels[i] = (1-chorusGain)*inPixels[i] + chorusGain*(inPixels[i-totalDelay]);
                if(outPixels[i] > max) max = outPixels[i];
            }

            // change the phase of lfo
            phase += (parseFloat(frequency)) /(imageSize/4);
            if(phase >= 1.0) phase -= 1.0;
        }

        // normalize the image
        var ratio = max/255;
        outPixels = outPixels.map(v => Math.round(v / ratio));

        // store as output
        let newImage = new ImageData(new Uint8ClampedArray(outPixels), data.width, data.height)
        ctx.putImageData(newImage, 0, 0)
    };

    const applyEffect = async () =>{ 
        // get the image from the input
        const canvas = document.getElementById('outputCanvas');
        const ctx = document.getElementById('outputCanvas').getContext('2d', { willReadFrequently: true });
        const bm = await createImageBitmap(image)
        const img = new Image();
        canvas.width = bm.width;
        canvas.height = bm.height;
        setWidth(canvas.width)
        setHeight(canvas.height)
      
        img.onload = () => { 
            ctx.drawImage(img,0,0)
            let data = ctx.getImageData(0,0, img.width, img.height)

            // apply selected effect
            switch (effect){
                case "echo": applyEchoEffect(ctx, data); break;
                case "distortion": applyDistortionEffect(ctx, data); break;
                case "chorus": applyChorusEffect(ctx, data); break;
                default: break;
            }
        }
        img.src = URL.createObjectURL(image)
    }

    // function to download the output image
    const downloadOutput = () =>{
        var link = document.createElement('a');
        link.download = 'image.png';
        link.href = document.getElementById('outputCanvas').toDataURL()
        link.click();
    }

    if(image){
    return(
        <div style={{display: "flex", flexDirection: "column", width: "40vw", maxHeight: "90vh", marginTop: "15vh"}}>
            <canvas id="outputCanvas" style={{ maxWidth: "40vw", maxHeight: "60vh", borderRadius: 5, border: "2px solid #AAAAAA", marginBottom: 10, alignSelf: "center"}}/>
            <Typography pb={2} style={{alignSelf: "center"}} >{imgWidth} x {imgHeight}</Typography>
            <Stack direction="column" alignSelf="center" width="25vw" height="40vh">
                <Stack direction="row" alignSelf="center" alignItems="center" pb={2}>
                    <Button variant="outlined" onClick={applyEffect} style={{alignSelf: "center", marginRight: 5}} >
                        Apply Effect
                    </Button>
                    <div hidden={imgWidth===0}>
                        <Button variant="outlined" onClick={downloadOutput} style={{alignSelf: "center", marginLeft: 5}} >
                            Download Image
                        </Button>
                    </div>
                </Stack>
                <FormControl fullWidth>
                    <InputLabel id="effect-select-label">Effect</InputLabel>
                    <Select
                        labelId="effect-select-label"
                        id="effect-select"
                        value={effect}
                        label="Effect"
                        onChange={handleEffectChange}
                    >
                        <MenuItem value={"echo"}>Echo</MenuItem>
                        <MenuItem value={"distortion"}>Distortion</MenuItem>
                        <MenuItem value={"chorus"}>Chorus</MenuItem>
                    </Select>
                </FormControl>
                <div hidden={effect!=="echo"}>
                    <Stack direction="column" alignSelf="center" minWidth="25vw" pb={5}>
                        <Typography pt={2}>Delay Time (Pixels)</Typography>
                        <Input value={sampleOffset} size="large" onChange={handleSampleChange} inputProps={{type: 'number'}}/>
                        <Typography pt={2}>Feedback Gain</Typography>
                        <Slider value={gFB} onChange={handleGFBChange} valueLabelDisplay="auto" step={0.01} min={0} max={1}/>
                        <Typography pt={2}>Feed Forward Gain</Typography>
                        <Slider value={gFF} onChange={handleGFFChange} valueLabelDisplay="auto" step={0.01} min={0} max={1}/>
                    </Stack>
                </div>
                <div hidden={effect!=="distortion"}>
                    <Stack direction="column" alignSelf="center" minWidth="25vw" pb={5}>
                        <Typography pt={2}>Clipping Level</Typography>
                        <Slider value={clippingLevel} onChange={handleClipChange} valueLabelDisplay="auto" step={0.01} min={0} max={1}/>
                        <Typography pt={2}>Make-up Gain</Typography>
                        <Slider value={makeupGain} onChange={handleMakeupGainChange} valueLabelDisplay="auto" step={0.01} min={0} max={1}/>
                    </Stack>
                </div>
                <div hidden={effect!=="chorus"}>
                    <Stack direction="column" alignSelf="center" minWidth="25vw" pb={5}>
                        <Typography pt={2}>Chorus Gain</Typography>
                        <Slider value={chorusGain} onChange={handleChorusGainChange} valueLabelDisplay="auto" step={0.01} min={0} max={1}/>
                        <Typography pt={2}>Delay Time (Pixels)</Typography>
                        <Input value={chorusDelaySamples} size="large" onChange={handleChorusSampleChange} inputProps={{type: 'number'}}/>
                        <Typography pt={2}>Sweep Width (Pixels)</Typography>
                        <Input value={sweepWidth} size="large" onChange={handleSweepWidthChange} inputProps={{type: 'number'}}/>
                        <Typography pt={2}>Frequency</Typography>
                        <Input value={frequency} size="large" onChange={handleFrequencyChange} inputProps={{type: 'number'}}/>
                    </Stack>
                </div>
            </Stack>
        </div>
    )
    }
    return( <div/> )
}

