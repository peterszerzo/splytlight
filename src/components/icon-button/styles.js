import { StyleSheet } from 'aphrodite'
import * as vars from '../../constants/styling'

export default StyleSheet.create({
  root: {
    position: 'relative',
    textDecoration: 'none',
    width: '40px',
    height: '40px',
    cursor: 'pointer',
    borderRadius: '20px',
    textAlign: 'center',
    margin: '10px 0',
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
  },
  uploadInput: {
    width: '0.1px',
    height: '0.1px',
    opacity: '0',
    overflow: 'hidden',
    position: 'absolute',
    zIndex: '-1'
  },
  uploadLabel: {
    cursor: 'pointer',
    width: '100%',
    height: '100%'
  }
})
