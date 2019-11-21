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
      width: this.props.width,
      marginLeft: whiteKey ? 0 : -(this.props.width / 2),
      marginRight: whiteKey ? 0 : -(this.props.width / 2),
      boxShadow: 'none',
      background: whiteKey ? 'white' : 'black',
      color: whiteKey ? 'white' : 'black',
      zIndex: whiteKey ? 0 : 1,
      display: 'flex',
      border: '1px solid grey',
      ':hover': {
        color: whiteKey ? 'black' : 'white',
      },
    }
  }

  getLabelStyles = () => ({
    flex: 1,


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
