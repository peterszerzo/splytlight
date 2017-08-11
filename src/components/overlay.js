import React from 'react'
import {css, StyleSheet} from 'aphrodite'
import * as vars from '../constants/styling'
import Static from './static'

const styles = StyleSheet.create({
  root: {
    position: 'fixed',
    width: '100vw',
    height: `calc(100vh - ${vars.headerHeight}px)`,
    top: vars.headerHeight + 'px',
    padding: vars.standardPadding + 'px',
    left: '0',
    background: vars.blue,
    zIndex: '1000',
    color: vars.white,
    borderTop: `2px solid ${vars.white}`,
    opacity: '0',
    pointerEvents: 'none',
    transform: 'translate(0, 10px)',
    transition: 'all .3s',
    textAlign: 'right'
  },
  active: {
    pointerEvents: 'all',
    transform: 'translate(0, 0)',
    opacity: '1'
  }
})

export default ({isActive, content}) => (
  <div className={css([styles.root, isActive && styles.active])}>
    <Static content={content} />
  </div>
)
