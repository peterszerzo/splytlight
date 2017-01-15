import { createElement } from 'react'
import { css } from 'aphrodite'
const { header, h1, div } = require('hyperscript-helpers')(createElement)
import { title } from '../../content'
import styles from './styles'
import Icon from '../icon'
import * as vars from '../../constants/styling'

export default () => (
  header({
    className: css(styles.container)
  },
    div({
      className: css(styles.logoContainer)
    }, Icon({
      id: 'logo',
      style: {
        fill: vars.white
      }
    })),
    h1({
      className: css(styles.text)
    }, title)
  )
)
