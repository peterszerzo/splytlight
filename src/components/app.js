import { createElement } from 'react'
const { div } = require('hyperscript-helpers')(createElement)
import { css } from 'aphrodite'
import DrawNav from './draw-nav'
import Overlay from './overlay'
import Nav from './nav'
import { about } from '../content'
import Header from './header'
import TwoDee from './2d/index'
import ThreeDee from './3d/index'
import styles from './styles'

export default ({state, setState}) => (
  div({
    className: css(styles.root)
  },
    Header(),
    Overlay({
      isActive: state.route === 'about',
      content: about
    }),
    Nav({state, setState}),
    div({
      className: css(styles.main)
    },
      div({
        className: css(styles.viz)
      },
        TwoDee({
          state,
          setState: (treeStateChange) => {
            return setState({
              tree: Object.assign({}, state.tree, treeStateChange)
            })
          }
        })
      ),
      createElement(ThreeDee, {
        state,
        setState
      }),
      DrawNav({state})
    )
  )
)
