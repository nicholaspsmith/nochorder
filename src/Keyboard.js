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

  synth = new Tone.DuoSynth({
    vibratoAmount  : 0.5 ,
    vibratoRate  : 3 ,
    harmonicity  : 1.5 ,
    voice0  : {
      volume  : -10 ,
      portamento  : 0 ,
      oscillator  : {
      type  : 'sine'
    }  ,
    filterEnvelope  : {
      attack  : 0.01 ,
      decay  : 0 ,
      sustain  : 1 ,
      release  : 0.5
    }  ,
    envelope  : {
      attack  : 0.01 ,
      decay  : 0 ,
      sustain  : 1 ,
      release  : 0.5
    }
    },
    voice1  : {
      volume  : -10 ,
      portamento  : 0 ,
      oscillator  : {
      type  : 'sine'
    },
    filterEnvelope  : {
      attack  : 0.01 ,
      decay  : 0,
      sustain  : 1 ,
      release  : 0.5
    }  ,
    envelope  : {
      attack  : 0.01 ,
      decay  : 0,
      sustain  : 1 ,
      release  : 0.5
      }
    }
  }).toMaster()

  state = {
    currentNote: null,
    mouseDown: false,
  }

  // octaveStart = 3
  // octaves = 2
  constructor(props) {
    super(props)

    window.addEventListener('mouseup', this.handleMouseUp, true)

    const { octaveStart, octaves } = this.props
    const octavesArray = [...Array(octaves).keys()] // [0,1]
    const octavesArrayCorrectStartOctave = octavesArray.map(oct => oct + octaveStart) // [3,4]
    octavesArrayCorrectStartOctave.map(octave => (
      notes.map(note => Keyboard.keyNotes.push(`${note}${octave}`))
    ))
  }

  playNote = e => {
    // find note value of key that mouse is over
    let note = e.target.getAttribute('note')
    // play synth on note found
    this.synth.triggerAttack(note, Tone.context.currentTime)
    // set current playing note so we can track if it changes
    this.setState({ currentNote: note, mouseDown: true })
  }

  handleMouseDown = e => {
    this.playNote(e)
  }

  handleMouseUp = e => {
    this.synth.triggerRelease(Tone.context.currentTime)
    this.setState({ mouseDown: false })
    // window.removeEventListener('mouseup', this.handleMouseUp, true);
  }

  handleMouseMove = e => {
    // find note that mouse is currently over
    let note = e.target.getAttribute('note')
    const isNewNote = this.state.currentNote !== note
    if (!isNewNote) return

    if (this.state.mouseDown) {
      // stop playing old note
      this.synth.triggerRelease(Tone.context.currentTime)
      // set new currentNote
      this.setState({ currentNote: note } , () => {
        // start playing new note
        this.synth.triggerAttack(note, Tone.context.currentTime)
      })
      }
    }

  render() {
    let keyWidth = window.innerWidth / (Keyboard.keyNotes.length * 7/12) //-> 7/12 of the notes are white, white notes take up width, black do not
    let keyHeight = keyWidth * 4

    return (
      <div style={Keyboard.keyboardStyles} onMouseDown={this.handleMouseDown} onTouchStart={this.handleMouseDown} onMouseMove={this.handleMouseMove} onTouchMove={this.handleMouseMove}>
        {
          Keyboard.keyNotes.map(
            keyNote => 
              <Key
                isBeingPlayed={this.state.mouseDown && (keyNote === this.state.currentNote)}
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
