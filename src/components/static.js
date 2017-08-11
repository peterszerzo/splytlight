import React from 'react'
import marked from 'marked'

export default ({content}) => (
  <div className={'static'} dangerouslySetInnerHTML={{__html: marked(content)}} />
)
