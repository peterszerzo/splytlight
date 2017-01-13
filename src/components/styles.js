import { StyleSheet } from 'aphrodite'
import * as vars from '../constants/styling'

export default StyleSheet.create({
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
