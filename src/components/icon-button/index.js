import {createElement} from 'react'
const {div, span, a} = require('hyperscript-helpers')(createElement)

import cls from './style.css'

export default ({unicodeIcon, onClick, href}) => {
  const el = href ? a : div
  return (
    el({
      className: cls.container,
      onClick,
      href
    }, span({}, unicodeIcon))
  )
}
