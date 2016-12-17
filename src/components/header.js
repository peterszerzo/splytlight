import {createElement} from 'react'
import {StyleSheet, css} from 'aphrodite'
const {header, h1, div, svg} = require('hyperscript-helpers')(createElement)
const {use} = require('hyperscript-helpers/dist/svg')(createElement)
import * as vars from '../constants/styling'

const styles = StyleSheet.create({
  container: {
    boxSizing: 'border-box',
    width: '100%',
    height: vars.headerHeight + 'px',
    background: vars.blue,
    padding: `0 ${vars.standardPadding}px`,
    position: 'fixed',
    display: 'flex',
    top: '0',
    left: '0'
  },
  text: {
    paddingLeft: '8px',
    textAlign: 'left',
    width: '100%',
    margin: 'auto',
    color: vars.white,
    fontWeight: '300',
    fontSize: '1.25rem',
    letterSpacing: '.03rem'
  },
  logoContainer: {
    width: (vars.headerHeight - 2 * 15) + 'px',
    height: vars.headerHeight + 'px',
    padding: '15 0'
  },
  logo: {
    width: '100%',
    height: '100%',
    fill: vars.white
  }
})

export default () => (
  header({
    className: css(styles.container)
  },
    div({
      className: css(styles.logoContainer)
    }, svg({className: css(styles.logo)}, use({
      xlinkHref: '#logo'
    }))),
    h1({
      className: css(styles.text)
    }, 'Splyt Light Interactive')
  )
)
