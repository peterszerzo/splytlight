import { createElement } from 'react'
const { svg } = require('hyperscript-helpers/dist')(createElement)
const { g, rect, path } = require('hyperscript-helpers/dist/svg')(createElement)

const icons = {
  download: (
      svg({ width: '100%', height: '100%', viewBox: '0 0 800 800' },
        g({ transform: 'translate(111.000000, 72.000000)' },
          rect({
            x: '0',
            y: '577',
            width: '559',
            height: '60',
            rx: '30'
          }),
          path({ d: 'M309.573073,399.362482 L309.573073,30.0020043 C309.573073,13.4328926 296.141616,-2.84217094e-14 279.573073,-2.84217094e-14 C263.000888,-2.84217094e-14 249.573073,13.4323549 249.573073,30.0020043 L249.573073,398.573593 L168.217758,317.218278 C156.489906,305.490426 137.502005,305.497475 125.786277,317.213203 C114.067972,328.931508 114.07282,347.926154 125.791351,359.644685 L258.717277,492.570611 C264.908072,498.761405 273.121865,501.682294 281.221108,501.337133 C288.488066,501.042201 295.668678,498.119691 301.217758,492.570611 L434.143684,359.644685 C445.871536,347.916833 445.864487,328.928932 434.148758,317.213203 C422.430454,305.494899 403.435808,305.499747 391.717277,317.218278 L309.573073,399.362482 Z' })
        )
      )
    ),
  smallSplyt: (
      svg({ width: '100%', height: '100%', viewBox: '0 0 800 800' },
        path({
          d: 'M442,371.033321 L442,596.999809 C442,613.568457 428.572185,627 412,627 C395.431458,627 382,613.575801 382,596.999809 L382,381.347076 C381.0714,379.433461 380.349523,377.42881 379.84427,375.370138 L299.337657,228.79818 C291.358571,214.271295 296.016588,194.977095 309.751655,185.696603 L306.235065,188.072688 C319.965643,178.795229 337.816568,182.913903 346.092518,197.248269 L409.572666,307.199111 L453.001949,231.977387 C461.285144,217.630472 479.628829,212.713907 493.980762,221 C508.329541,229.284271 513.244964,247.633423 504.963473,261.977387 L442,371.033321 Z'
        })
      )
    ),
  largeSplyt: (
      svg({ width: '100%', height: '100%', viewBox: '0 0 800 800' },
        path({
          d: 'M428,462.202995 L428,662.794728 C428,679.363376 414.572185,692.794919 398,692.794919 C381.431458,692.794919 368,679.370721 368,662.794728 L368,457.16629 L205.252247,166.881929 C197.149364,152.429256 201.337263,132.660974 214.596847,122.735223 L211.412974,125.118581 C224.676737,115.189701 242.14887,118.779666 250.432717,133.12771 L399.692087,391.652522 L547.998189,134.778819 C556.28346,120.428307 574.628829,115.508827 588.980762,123.794919 C603.329541,132.07919 608.249977,150.41966 599.959713,164.778819 L429.963336,459.221181 C429.360367,460.265554 428.704116,461.259977 428,462.202995 Z'
        })
      )
    )
}

export default ({ id }) => {
  return icons[id]
}