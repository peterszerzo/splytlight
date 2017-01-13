import { Component, createElement } from 'react'
import { findDOMNode } from 'react-dom'
const { div } = require('hyperscript-helpers')(createElement)
import createThreeApp from './three-app'
import mouseDragContainer from './mouse-drag-container'

class ThreeDee extends Component {
  render () {
    return (
      div({
        className: this.props.className,
        ref: 'threedee',
        onMouseDown: this.props.onMouseDown,
        onMouseUp: this.props.onMouseUp,
        onMouseMove: this.props.onMouseMove
      })
    )
  }

  componentDidMount () {
    this.threeApp = createThreeApp(
      findDOMNode(this.refs.threedee),
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
