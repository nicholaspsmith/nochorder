import React from 'react';
import Keyboard from './Keyboard'
import MouseTracker from './MouseTracker'
import './App.css';

// TODO: Allow playing using computer keyboard
// TODO: Show all chords in a selected key/mode

function App() {
  return (
    <div className="App">
      <MouseTracker>
        <Keyboard octaveStart={3} octaves={3} />
      </MouseTracker>
    </div>
  );
}

export default App;
