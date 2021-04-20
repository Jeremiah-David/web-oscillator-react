import React, { useState, useRef } from "react";
// import logo from './logo.svg';
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import "../../App.css";
import Grid from '../Grid'

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

    let indexX 
    let indexY 
    let indexZ 

  const [indexFinger, setIndexFinger] = useState([indexX, indexY, indexZ,])
  



  const runHandpose = async () => {
    const net = await handpose.load();
    console.log("Handpose model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 16);
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const hand = await net.estimateHands(video);
    //   console.log(hand);
      if (hand.length > 0) {
        //   console.log('Index x axis', hand[0].landmarks[8][0])
          let indexX =  hand[0].landmarks[8][0]
          let indexY = hand[0].landmarks[8][1]
          let indexZ = hand[0].landmarks[8][2]
          
          setIndexFinger([indexX, indexY, indexZ])

      }


    }
  };

  runHandpose();

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
        
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
     
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            display: 'none',
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
      </header>
      <Grid indexFinger={indexFinger}/>
    </div>
  );
}

export default App;