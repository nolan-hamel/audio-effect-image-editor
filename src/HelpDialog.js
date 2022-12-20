//
//   Final Project - Audio Effect Image Editor
//   Author: Nolan Hamel 
//	 Date: 12/9/2022 
//
//   This file contains the Effect Help dialog box
//

import { Divider, Paper, Typography } from '@mui/material';
import * as React from 'react';

export default function HelpDialog() {
  return (
    <div style={{alignSelf: "center", paddingTop: 10, paddingBottom: 20, width: "40vw"}}>
        <Paper elevation={3} style={{maxHeight: "40vh", overflow: 'auto', borderRadius: 10}}>
            <Typography pt={2} variant="h4" align='center'>
                Effect Help
            </Typography>
            <Typography pt={1} variant="body2" align='center'>
                Welcome to Nolan's audio-effect based image editor!
            </Typography>
            <Typography pb={2} variant="body2" align='center'>
                Here are some tips regarding each of the effects and what its parameters do.
            </Typography>

            <Divider textAlign="left">ECHO</Divider>
            <Typography p={2} variant="body1">
                The echo effect will add echos to the input image.
            </Typography>
            <Divider textAlign="center">Delay Time (Pixels)</Divider>
            <Typography p={2} variant="body1">
                Delay time controls how "large" the echo is.
                In terms of audio, delay time refers to how long it takes until you hear the original sound again.
            </Typography>
            <Divider textAlign="center">Feedback Gain</Divider>
            <Typography p={2} variant="body1">
                Feedback Gain controls how many echos are in the final image.
            </Typography>
            <Divider textAlign="center">Feed Forward Gain</Divider>
            <Typography p={2} variant="body1">
                Feed Forward Gain controls the factor at which the echos are mixed into the final image.
            </Typography>

            <Divider textAlign="left">DISTORTION</Divider>
            <Typography p={2} variant="body1">
                The distortion effect clamps and amplifys the input image. 
                It acts on each channel independently rather than on pixel values, 
                so it can lead to some interesting results.
            </Typography>
            <Divider textAlign="center">Clipping Level</Divider>
            <Typography p={2} variant="body1">
                Clipping Level controls how bright of a channel value it will clip.
                For example, a Clipping Level of 0.4 will clip the top 40% of possible channel values (255 to 153).
            </Typography>
            <Divider textAlign="center">Make-up Gain</Divider>
            <Typography p={2} variant="body1">
                Make-up Gain controls how much the affected values are brightened.
                For example, a Make-up Gain of 1 will brighten all clipped values to 255.
            </Typography>

            <Divider textAlign="left">CHORUS</Divider>
            <Typography p={2} variant="body1">
                The Chorus effect is like an echo with a Low Frequency Oscillator (LFO) affecting the delay time.
            </Typography>
            <Divider textAlign="center">Chorus Gain</Divider>
            <Typography p={2} variant="body1">
                Chorus Gain controls how much the chorus is mixed with the original image.
                For example, a Chorus Gain of 1 will only be the affected image, and a value of 0.5 will average the original image and the affected image.
            </Typography>
            <Divider textAlign="center">Delay Time (Pixels)</Divider>
            <Typography p={2} variant="body1">
                Delay time controls how "large" the echo is.
                In terms of audio, delay time refers to how long it takes until you hear the original sound again.
            </Typography>
            <Divider textAlign="center">Sweep Width (Pixels)</Divider>
            <Typography p={2} variant="body1">
                Sweep Width controls how large the amplitude of the LFO is.
            </Typography>
            <Divider textAlign="center">Frequency</Divider>
            <Typography p={2} variant="body1">
                Frequency controls how many waves there are in the output image.
            </Typography>
        </Paper>
    </div>
  );
}