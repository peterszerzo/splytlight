import { createElement } from 'react'
const { a } = require('hyperscript-helpers')(createElement)
import { css, StyleSheet } from 'aphrodite'
import * as vars from '../../constants/styling'
import Icon from '../icon'

const styles = StyleSheet.create({
  root: {
    textDecoration: 'none',
    width: '40px',
    height: '40px',
    cursor: 'pointer',
    borderRadius: '20px',
    textAlign: 'center',
    margin: '10px 0',
    fontSize: '1.25rem',
    background: vars.blue,
    color: vars.white,
    boxShadow: '0 0 12px rgba(0, 0, 0, .1), 0 0 6px rgba(0, 0, 0, .2)',
    display: 'flex',
    alignItems: 'center',
    fill: vars.white,
    justifyContent: 'center',
    padding: '8px',
    opacity: '0.7',
    transition: 'opacity .3s',
    ':hover': {
      opacity: '1'
    }
  }
})

export default ({ icon, onClick, href }) => {
  return (
    a({
      className: css(styles.root),
      onClick,
      href: href || 'javascript:void(0)'
    },
      Icon({ id: icon })
    )
  )
}