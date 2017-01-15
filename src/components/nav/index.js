import { createElement } from 'react'
const { div, span, nav } = require('hyperscript-helpers')(createElement)
import { css } from 'aphrodite'
import styles from './styles'

export default ({ state, setState }) => (
  nav({ className: css(styles.root) },
    div({ className: css(styles.toggle) },
      span({
        className: css(styles.span),
        onClick: () => {
          setState({route: state.route === 'about' ? '' : 'about'})
        }
      }, 'About')
    )
  )
)
