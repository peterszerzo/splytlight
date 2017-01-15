import { StyleSheet } from 'aphrodite'
import * as vars from '../../constants/styling'

export default StyleSheet.create({
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
