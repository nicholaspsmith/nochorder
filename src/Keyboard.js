import React, { Component } from 'react'
import Tone from 'tone'
import PropTypes from 'prop-types'
import Key from './Key'

const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

// TODO: implement an offset so you can start with A (like on a piano)

class Keyboard extends Component {
  static keyNotes = [];

  static propTypes = {
    octaves: PropTypes.number.isRequired,
    octaveStart: PropTypes.number.isRequired,
    startOffset: PropTypes.number,
  }

  static keyboardStyles = {
    display: 'flex',
    flexDirection: 'row'
  }

  synth = new Tone.Synth().toMaster()

  state = {
    currentNote: null,
    mouseDown: false,
  }

  // octaveStart = 3
  // octaves = 2
  constructor(props) {
    super(props)

    const { octaveStart, octaves } = this.props
    const octavesArray = [...Array(octaves).keys()] // [0,1]
    const octavesArrayCorrectStartOctave = octavesArray.map(oct => oct + octaveStart) // [3,4]
    octavesArrayCorrectStartOctave.map(octave => (
      notes.map(note => Keyboard.keyNotes.push(`${note}${octave}`))
    ))
  }

  handleMouseDown = e => {
    // find note value of key that mouse is over
    let note = e.target.getAttribute('note')
    // play synth on note found
    this.synth.triggerAttack(note, Tone.context.currentTime)
    console.log(`play ${note}`)
    // set current playing note so we can track if it changes
    this.setState({ currentNote: note, mouseDown: true })
    
    window.addEventListener('mouseup', this.handleMouseUp, true)
  }

  handleMouseUp = e => {
    this.synth.triggerRelease(Tone.context.currentTime)
    this.setState({ mouseDown: false })
    window.removeEventListener('mouseup', this.handleMouseUp, true);
  }

  handleMouseMove = e => {
    // if mouse button is down
    if (this.state.mouseDown) {
      // find note that mouse is currently over
      let note = e.target.getAttribute('note')
      // if current note mouse is clicking is different than current note
      if (this.state.currentNote !== note) {
        // stop playing old note
        console.log(`stop playing ${this.state.currentNote}`)
        this.synth.triggerRelease(Tone.context.currentTime)
        // start playing new note
        console.log(`play ${note}`)
        this.synth.triggerAttack(note, Tone.context.currentTime)
      } else {
        this.synth.triggerRelease(Tone.context.currentTime)
      }
    }
  }

  render() {
    let keyWidth = window.innerWidth / (Keyboard.keyNotes.length * 7/12) //-> 7/12 of the notes are white, white notes take up width, black do not
    let keyHeight = keyWidth * 4

    return (
      <div style={Keyboard.keyboardStyles} onMouseDown={this.handleMouseDown} onMouseMove={this.handleMouseMove}>
        {
          Keyboard.keyNotes.map(
            keyNote => 
              <Key
                key={keyNote}
                note={keyNote}
                width={keyWidth}
                height={keyHeight}
              />
          )
        }
      </div>
    )
  }
}

export default Keyboard
