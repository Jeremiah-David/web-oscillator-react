import { useEffect, useState } from 'react'




function Grid (props) {

    const [indexFingerX, setIndexFingerX] = useState([props.indexFinger[0]])

    useEffect(() => {
        function handleStatusChange(indexFingerX) {
          setIndexFingerX(props.indexFinger[0]);
        }
    }
)
    


    console.log(props.indexFinger[0])
    let oscillatorX, oscillatorY

    let oscX = {
        type: "sine",
        frequency: indexFingerX,
        playing: false
    }

    let oscY = {
        type: oscX.type,
        frequency: 200 * 1.01,
        playing: false
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

    function playY() {
        if (oscY.playing) {
            oscillatorY.stop()
            oscY.playing = false
        } else {
            oscillatorY = audioContext.createOscillator()
            oscillatorY.type = oscY.type
            oscillatorY.frequency.setValueAtTime(oscY.frequency, audioContext.currentTime)
            oscillatorY.connect(audioContext.destination)
            oscillatorY.start()
            oscY.playing = true
        }
    }

    function setSine() {
        oscX.type = "sine"
        oscY.type = "sine"
    }

    function setTriangle() {
        oscX.type = "triangle"
        oscY.type = "triangle"
    }

    function setSquare() {
        oscX.type = "square"
        oscY.type = "square"
    }

    function setSawtooth() {
        oscX.type = "sawtooth"
        oscY.type = "sawtooth"
    }

    return (
        <div className="osc">
            {console.log('grid', props)}
            <h1>Where the music happens</h1>
            <button type="button" onClick={() => { playX(); playY() }}>play/pause</button><br></br>
            <button type="button" onClick={setSine}>sine</button><br></br>
            <button type="button" onClick={setTriangle}>triangle</button><br></br>
            <button type="button" onClick={setSquare}>square</button><br></br>
            <button type="button" onClick={setSawtooth}>sawtooth</button><br></br>
        </div>
    )
}

export default Grid