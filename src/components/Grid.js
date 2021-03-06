import React, { useState, useEffect } from 'react'
function Grid (props) {

    const [fingerIndexX, setFingerIndexX] = useState(200)

    // function changeFingerIndex(){}
    //     setFingerIndexX(props.indexFinger[0])
    // }



    let oscillatorX

    let oscX = {
        type: "sine",
        frequency: 200,
        playing: false, 
        fingerPos: Math.floor(fingerIndexX)
    }

    const audioContext = new AudioContext()

    function playX() {
        if (oscX.playing) {
            oscillatorX.stop()
            oscX.playing = false
        } else {
            oscillatorX = audioContext.createOscillator()
            oscillatorX.type = oscX.type
            oscillatorX.frequency.setValueAtTime(oscX.frequency, audioContext.currentTime)
            oscillatorX.connect(audioContext.destination)
            oscillatorX.start()
            oscX.playing = true
        }
    }

    function setSine() {
        oscX.type = "sine"
    }

    function setTriangle() {
        oscX.type = "triangle"
    }

    function setSquare() {
        oscX.type = "square"
    }

    function setSawtooth() {
        oscX.type = "sawtooth"
    }

    

    function changeFreq(){
        if(props.indexFinger[0] > 0){
            setFingerIndexX(props.indexFinger[0])
            console.log('fingerindex', fingerIndexX)
            if (oscX.playing) {
                oscillatorX.stop()
                oscX.playing = false
            } else {
                oscillatorX = audioContext.createOscillator()
                oscillatorX.type = oscX.type
                oscillatorX.frequency.setValueAtTime(oscX.frequency, audioContext.currentTime)
                oscillatorX.connect(audioContext.destination)
                oscillatorX.start()
                oscX.playing = true
            }
        }
    }



    setInterval(changeFreq, 100)

    return (
        <div className="osc">
            {console.log(fingerIndexX)}
            <h1>Where the music happens</h1>
            {/* <button type="button" onClick={() => { playX(); playY() }}>play/pause</button><br></br> */}
            <button type="button" onClick={playX}>play/pause</button><br></br>
            {/* <button type="button" onClick={changeFreq}>change frequency</button><br></br> */}
            <button type="button" onClick={setSine}>sine</button><br></br>
            <button type="button" onClick={setTriangle}>triangle</button><br></br>
            <button type="button" onClick={setSquare}>square</button><br></br>
            <button type="button" onClick={setSawtooth}>sawtooth</button><br></br>
        </div>
    )
}

export default Grid