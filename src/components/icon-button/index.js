import { createElement } from 'react'
const { a, button, div, input, label } = require('hyperscript-helpers')(createElement)
import { css } from 'aphrodite'
import Icon from '../icon'
import styles from './styles'

export default ({ icon, onClick, onUpload, uploadId, href, title }) => {
  const child = Icon({ id: icon })
  if (href) {
    return (
      a({
        className: css(styles.root),
        title,
        href
      }, child)
    )
  }
  if (onClick) {
    return (
      button({
        className: css(styles.root),
        title,
        onClick
      }, child)
    )
  }
  if (onUpload) {
    return (
      div({
        className: css(styles.root)
      },
        input({
          id: uploadId,
          className: css(styles.uploadInput),
          type: 'file',
          onChange: e => {
            const file = e.target.files[0]
            const reader = new global.FileReader()
            reader.onload = e => { onUpload(e.target.result) }
            reader.readAsText(file)
          }
        }),
        label({
          htmlFor: uploadId,
          className: css(styles.uploadLabel)
        }, child
        )
      )
    )
  }
  return null
}
