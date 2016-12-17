import {createElement} from 'react'
import {css, StyleSheet} from 'aphrodite'
const {div} = require('hyperscript-helpers')(createElement)
import * as vars from '../constants/styling'
import Editor from './editor'
import EditorNav from './editor-nav'
import Overlay from './overlay'
import Nav from './nav'
import {about} from '../content'
import Header from './header'

const styles = StyleSheet.create({
  root: {
    display: 'block',
    position: 'relative'
  },
  main: {
    position: 'fixed',
    width: '100%',
    display: 'flex',
    height: `calc(100% - ${vars.headerHeight}px)`,
    bottom: '0',
    left: '0'
  },
  viz: {
    position: 'relative',
    width: '50%',
    height: '100%',
    flex: '1',
    ':first-of-type': {
      borderRight: `1px solid ${vars.blue}`
    }
  }
})

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
        Editor({
          state,
          setState: (treeStateChange) => {
            return setState({
              tree: Object.assign({}, state.tree, treeStateChange)
            })
          }
        })
      ),
      div({
        className: css(styles.viz),
        id: '3d'
      }),
      EditorNav({state})
    )
  )
)
