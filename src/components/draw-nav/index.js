import {createElement} from 'react'
const {div} = require('hyperscript-helpers')(createElement)
import {StyleSheet, css} from 'aphrodite'
import IconButton from '../icon-button'

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    top: '40px',
    left: '50%',
    transform: 'translate(-50%, 0)',
    width: '40px'
  }
})

export default ({state}) => (
  div({
    className: css(styles.root)
  },
    IconButton({
      icon: '1',
      href: `data:application/octet-stream;type=,${JSON.stringify(state.tree)}`
    })
  )
)
