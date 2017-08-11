import React, { Component } from 'react'
import createThreeApp from './three-app'
import mouseDragContainer from './mouse-drag-container'

class ThreeDee extends Component {
  render () {
    return (
      <div
        className={this.props.className}
        ref={this.setContainerNode.bind(this)}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        onMouseMove={this.props.onMouseMove}
        onMouseOut={this.props.onMouseOut}
      />
    )
  }

  setContainerNode (node) {
    this.containerNode = node
  }

  componentDidMount () {
    this.threeApp = createThreeApp(
      this.containerNode,
      {
        global: this.props.state,
        drag: this.props.drag
      }
    )
  }

  componentDidUpdate () {
    this.threeApp.update({
      global: this.props.state,
      drag: this.props.drag
    })
  }
}

export default mouseDragContainer(ThreeDee)
