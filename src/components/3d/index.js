import { Component, createElement } from 'react'
import { findDOMNode } from 'react-dom'
const { div } = require('hyperscript-helpers')(createElement)
import { render, renderer, update, createControls } from './render'
import { css } from 'aphrodite'
import styles from '../styles'

export default class ThreeDee extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
  }

  render() {
    return (
      div({
        className: css(styles.viz),
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
    createControls(node).addEventListener('change', render)
    render()
    update(this.props.state)
  }

  componentDidUpdate() {
    update(this.props.state)
  }

  handleMouseDown() {
    console.log('mouse down')
  }

  handleMouseUp() {
    console.log('mouse up')
  }

  handleMouseMove() {
    console.log('mouse moving')
  }
}
