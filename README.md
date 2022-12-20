# Final Project - Audio Effect Image Editor
Author: Nolan Hamel 
Date: 12/9/2022 

The project can be access by going to: https://nhamel-cpsc-6040-final.surge.sh
Or you can run it yourself after completing the following instructions.

# Prerequisites
This project requires Node.js (https://nodejs.org) which includes npm

To install all the dependencies, run `npm install`

# Running the app from source
Run the command `npm start`, and the app will run at http://localhost:3000

# Working the app

The app contains the following effects and parameters:

# ECHO
The echo effect will add echos to the input image.

Parameters:

### Delay Time (Pixels)
Delay time controls how "large" the echo is. 
In terms of audio, delay time refers to how long it takes until you hear the original sound again.

### Feedback Gain
Feedback Gain controls how many echos are in the final image.

### Feed Forward Gain
Feed Forward Gain controls the factor at which the echos are mixed into the final image.

___

# DISTORTION
The distortion effect clamps and amplifys the input image. 
It acts on each channel independently rather than on pixel values, so it can lead to some interesting results.

Parameters:

### Clipping Level
Clipping Level controls how bright of a channel value it will clip. 
For example, a Clipping Level of 0.4 will clip the top 40% of possible channel values (255 to 153).

### Make-up Gain
Make-up Gain controls how much the affected values are brightened. 
For example, a Make-up Gain of 1 will brighten all clipped values to 255.

___

# CHORUS
The Chorus effect is like an echo with a Low Frequency Oscillator (LFO) affecting the delay time.

Parameters:

### Chorus Gain
Chorus Gain controls how much the chorus is mixed with the original image. 
For example, a Chorus Gain of 1 will only be the affected image, and a value of 0.5 will average the original image and the affected image.

### Delay Time (Pixels)
Delay time controls how "large" the echo is. 
In terms of audio, delay time refers to how long it takes until you hear the original sound again.

### Sweep Width (Pixels)
Sweep Width controls how large the amplitude of the LFO is.

### Frequency
Frequency controls how many waves there are in the output image.
