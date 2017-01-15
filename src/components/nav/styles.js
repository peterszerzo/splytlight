import { StyleSheet } from 'aphrodite'
import * as vars from '../../constants/styling'

export default StyleSheet.create({
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
