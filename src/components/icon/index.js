import { createElement } from 'react'
const { svg } = require('hyperscript-helpers/dist')(createElement)
const { rect } = require('hyperscript-helpers/dist/svg')(createElement)

const stroke = 8
const res = 100

export default ({id}) => {
  return (
    svg({ width: '100%', height: '100%', viewBox: '0 0 100 100' },
      rect({
        x: (res / 2 - stroke / 2),
        y: res * 0.15,
        width: stroke,
        height: res * 0.45,
        rx: stroke / 2,
        ry: stroke / 2
      }),
      rect({
        x: res * 0.3,
        y: res * 0.7,
        width: res * (1 - 0.6),
        height: stroke,
        rx: stroke / 2,
        ry: stroke / 2
      })
    )
  )
}
