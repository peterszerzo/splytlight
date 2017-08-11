import React from 'react'
import { css, StyleSheet } from 'aphrodite'
import * as vars from '../constants/styling'

const styles = StyleSheet.create({
  root: {
    position: 'static'
  },
  toggle: {
    position: 'fixed',
    height: vars.headerHeight,
    top: '0',
    right: '0',
    width: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: vars.standardPadding
  },
  span: {
    color: vars.white,
    cursor: 'pointer'
  }
})

export default ({ state, setState }) => (
  <nav className={css(styles.root)}>
    <div className={css(styles.toggle)}>
      <span
        className={css(styles.span)}
        onClick={() => {
          setState({route: state.route === 'about' ? '' : 'about'})
        }}
      >About</span>
    </div>
  </nav>
)
