import { Component, createElement } from 'react'
import { findDOMNode } from 'react-dom'
const { div } = require('hyperscript-helpers')(createElement)
import { render, renderer, update } from './render'

export default class ThreeDee extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mouseAtDragStart: null,
      mouseCurrent: null
    }
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
  }

  render() {
    return (
      div({
        className: this.props.className,
        ref: 'threedee',
        onMouseDown: this.handleMouseDown,
        onMouseUp: this.handleMouseUp,
        onMouseMove: this.handleMouseMove
      })
    )
  }

  componentDidMount() {
    const node = findDOMNode(this.refs.threedee)
    node.appendChild(renderer.domElement)
    render()
    update(this.props.state)
  }

  componentDidUpdate() {
    update(this.props.state)
  }

  handleMouseDown(e) {
    this.setState({
      mouseAtDragStart: [
        e.nativeEvent.offsetX,
        e.nativeEvent.offsetY
      ]
    })
  }

  handleMouseUp() {
    this.setState({
      mouseAtDragStart: null
    })
  }

  handleMouseMove(e) {
    this.setState({
      mouse: [
        e.nativeEvent.offsetX,
        e.nativeEvent.offsetY
      ]
    })
  }
}
