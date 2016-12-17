import {createElement} from 'react'
const {div, span, a} = require('hyperscript-helpers')(createElement)
import {css, StyleSheet} from 'aphrodite'
import * as vars from '../constants/styling'

const styles = StyleSheet.create({
  root: {
    textDecoration: 'none',
    width: '40px',
    height: '40px',
    cursor: 'pointer',
    borderRadius: '50px',
    textAlign: 'center',
    margin: '10px 0',
    fontSize: '1.25rem',
    background: vars.blue,
    color: vars.white,
    boxShadow: '0 0 12px rgba(0, 0, 0, .1), 0 0 6px rgba(0, 0, 0, .2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default ({unicodeIcon, onClick, href}) => {
  const el = href ? a : div
  return (
    el({
      className: css(styles.root),
      onClick,
      href
    }, span({}, unicodeIcon))
  )
}
