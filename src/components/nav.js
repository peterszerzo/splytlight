import React from 'react'
import { css, StyleSheet } from 'aphrodite'
import * as vars from '../constants/styling'
import { store, navigate } from '../state.js'

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
    textDecoration: 'none',
    color: vars.white,
    cursor: 'pointer'
  }
})

export default ({ state, setState }) => (
  <nav className={css(styles.root)}>
    <div className={css(styles.toggle)}>
      <a
        className={css(styles.span)}
        href={'/about'}
        onClick={e => {
          e.preventDefault()
          store.dispatch(navigate(
            state.route === '/about' ? '/' : '/about'
          ))
        }}
      >About</a>
    </div>
  </nav>
)
