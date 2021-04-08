import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Hand from '../src/components/hand/index'
import './App.css'

function App() {
  return (
    <div>
      <Router>
       <Route path="/hand" component= { Hand } />
      </Router>
    </div>
  );
}

export default App