import {createElement} from 'react'
import marked from 'marked'
const {div} = require('hyperscript-helpers')(createElement)

export default ({content}) => {
  return (
    div({
      className: 'static',
      dangerouslySetInnerHTML: {__html: marked(content)}
    })
  )
}
