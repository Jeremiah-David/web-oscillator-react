import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Hand from '../src/components/hand/index'






import './App.css';

function App() {
  

  let oscillatorX, oscillatorY

  let oscX = {
    type: "sine",
    frequency: 200,
    playing: false
  }

  let oscY = {
    type: oscX.type,
    frequency: 200 * 1.01,
    playing: false
  }

  const audioContext = new AudioContext()

  function playX(){
    if(oscX.playing){
      oscillatorX.stop()
      oscX.playing = false
    } else{
      oscillatorX = audioContext.createOscillator()
      oscillatorX.type = oscX.type
      oscillatorX.frequency.setValueAtTime(oscX.frequency, audioContext.currentTime)
      oscillatorX.connect(audioContext.destination)
      oscillatorX.start()
      oscX.playing = true
    }
  }

  function playY(){
    if(oscY.playing){
      oscillatorY.stop()
      oscY.playing = false
    } else{
      oscillatorY = audioContext.createOscillator()
      oscillatorY.type = oscY.type
      oscillatorY.frequency.setValueAtTime(oscY.frequency, audioContext.currentTime)
      oscillatorY.connect(audioContext.destination)
      oscillatorY.start()
      oscY.playing = true
    }
  }

  function setSine(){
    oscX.type = "sine"
    oscY.type = "sine"
  }

  function setTriangle(){
    oscX.type = "triangle"
    oscY.type = "triangle"
  }

  function setSquare(){
    oscX.type = "square"
    oscY.type = "square"
  }

  function setSawtooth(){
    oscX.type = "sawtooth"
    oscY.type = "sawtooth"
  }

  return (
    <div>
            <Router>
       <Route path="/hand" component= { Hand } />
      <h1>sanity check</h1>
      <button type="button" onClick={() => { playX(); playY()}}>play/pause</button><br></br>
      <button type="button" onClick={setSine}>sine</button><br></br>
      <button type="button" onClick={setTriangle}>triangle</button><br></br>
      <button type="button" onClick={setSquare}>square</button><br></br>
      <button type="button" onClick={setSawtooth}>sawtooth</button><br></br>
      </Router>
    </div>
  );
}

export default App;
