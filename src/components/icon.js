import React from 'react'

// See /public/index.html for icon declarations as <symbol> tags
const icons = {
  logo: {
    viewBox: '0 0 500 500'
  },
  download: {
    viewBox: '0 0 800 800'
  },
  upload: {
    viewBox: '0 0 800 800'
  },
  smallSplyt: {
    viewBox: '0 0 800 800'
  },
  largeSplyt: {
    viewBox: '0 0 800 800'
  }
}

export default ({ id, style }) => (
  <svg
    style={Object.assign({}, {
      width: '100%',
      height: '100%'
    }, style)}
    viewBox={icons[id].viewBox}
  >
    <use xlinkHref={`#${id}`} />
  </svg>
)
