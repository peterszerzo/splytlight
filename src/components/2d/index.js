import { createElement } from 'react'
const { div, svg } = require('hyperscript-helpers')(createElement)
const { g } = require('hyperscript-helpers/dist/svg')(createElement)
import getContainerDimensions from '../../layout'
import Units from './units'

export default ({state: {tree, ui}, setState}) => {
  const {width, height} = getContainerDimensions(ui)
  return (
    div({
      style: { margin: 'auto' }
    },
      svg({
        id: 'splyt-editor',
        className: 'editor',
        viewBox: `0 0 ${width} ${height}`
      },
        g({
          transform: `translate(${width / 2} ${height * 9 / 10}) rotate(${180})`
        },
          Units({
            state: tree,
            setState
          })
        )
      )
    )
  )
}
