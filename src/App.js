import React from 'react';
import Keyboard from './Keyboard'
import MouseTracker from './MouseTracker'
import './App.css';

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
