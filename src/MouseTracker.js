import React, { Component } from 'react'

class MouseTracker extends Component {
  state = {
    x: 0,
    y: 0,
  }

  handleMouseMove = event => 
    this.setState({ x: event.clientX, y: event.clientY })

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
        {this.props.children}
      </div>
    )
  }
}

export default MouseTracker
