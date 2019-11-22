import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'

class Key extends Component {
  static propTypes = {
    note: PropTypes.string.isRequired,
  }

  getButtonStyles = () => {
    const whiteKey = this.props.note.indexOf('#')  === -1

    return {
      height: whiteKey ? this.props.height : this.props.height / 2,
      width: whiteKey ? this.props.width : this.props.width - 5,
      marginLeft: whiteKey ? 0 : -(this.props.width / 2) + 3,
      marginRight: whiteKey ? 0 : -(this.props.width / 2) + 2,
      background: whiteKey ? 'white' : 'black',
      color: whiteKey ? 'white' : 'black',
      zIndex: whiteKey ? 0 : 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      border: '1px solid grey',
      cursor: 'pointer',
      boxShadow: this.props.isBeingPlayed ? '0px 1px 3px grey' : '2px 2px 5px grey',
      transform: this.props.isBeingPlayed ? 'translate(.5px, 3px)' : '',
      ':hover': {
        color: whiteKey ? 'black' : 'white',
      },
    }
  }

  getLabelStyles = () => ({
    flex: '1 1 0%',
    display: 'block',
    flexGrow: 0,
    marginTop: 'auto',
  })

  render() {
    return (
      <button style={this.getButtonStyles()}  note={this.props.note}>
        <div style={this.getLabelStyles()}>{this.props.note}</div>
      </button>
    )
  }
}

export default Radium(Key)


// detect mousedown
// if mouse's coordinates are within this key's coordinates (.getYPos or something)
//   then play this key
