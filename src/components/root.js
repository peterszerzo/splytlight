import React from 'react'
import { css, StyleSheet } from 'aphrodite'
import * as vars from '../constants/styling'
import DrawNav from './draw-nav'
import Overlay from './overlay'
import Nav from './nav'
import { about } from '../content'
import Header from './header'
import TwoDee from './2d'
import ThreeDee from './3d'

const styles = StyleSheet.create({
  root: {
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
      borderRight: `1px solid ${vars.faintBlue}`
    }
  }
})

export default ({state, setState}) => (
  <div className={css(styles.root)}>
    <Header />
    <Overlay
      isActive={state.route === 'about'}
      content={about}
    />
    <Nav state={state} setState={setState} />
    <div className={css(styles.main)}>
      <div className={css(styles.viz)}>
        <TwoDee
          className={css(styles.viz)}
          state={state}
          setState={(treeStateChange) => {
            return setState({
              tree: Object.assign({}, state.tree, treeStateChange)
            })
          }}
        />
      </div>
      <ThreeDee state={state} setState={setState} />
      <DrawNav state={state} setState={setState} />
    </div>
  </div>
)
