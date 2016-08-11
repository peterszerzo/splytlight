import h from 'virtual-dom/h';

import {svgNameSpace} from '../constants';

export default function Unit({baseHeight, armLength, armAngle}, {x, y}) {
  return (
    h('g', {
      namespace: svgNameSpace,
      attributes: {
        transform: `translate(${x} ${y})`,
        stroke: '#000',
        'stroke-width': '6',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      }
    }, [
      h('line', {namespace: svgNameSpace, attributes: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: baseHeight
      }}),
      h('line', {namespace: svgNameSpace, attributes: {
        x1: 0,
        y1: baseHeight,
        x2: - armLength * Math.cos(armAngle),
        y2: baseHeight + armLength * Math.sin(armAngle)
      }}),
      h('line', {namespace: svgNameSpace, attributes: {
        x1: 0,
        y1: baseHeight,
        x2: + armLength * Math.cos(armAngle),
        y2: baseHeight + armLength * Math.sin(armAngle)
      }}),
    ])
  );
}
