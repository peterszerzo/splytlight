import h from 'react-hyperscript';

import {splyt} from '../../constants/geometries';
import {
  getEndPoints,
  getStartPoint,
  getMidPoint
} from '../../utilities/splyt.js';
import {svgNameSpace} from '../../constants/strings';
import {blue, strokeWeight} from '../../constants/styling';

export default function Lines(state) {
  const [{x: xl, y: yl}, {x: xr, y: yr}] = getEndPoints(
    splyt[state.size], {
      useOffset: true
    }
  );
  const {x: x0, y: y0} = getStartPoint(
    splyt[state.size], {
      useOffset: true
    }
  );
  const {x: xm, y: ym} = getMidPoint(
    splyt[state.size]
  );
  return (
    h('g', {
      stroke: blue,
      'stroke-width': strokeWeight,
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('line', {namespace: svgNameSpace, attributes: {
        x1: x0,
        y1: y0,
        x2: xm,
        y2: ym
      }}),
      h('line', {namespace: svgNameSpace, attributes: {
        x1: xm,
        y1: ym,
        x2: xl,
        y2: yl
      }}),
      h('line', {namespace: svgNameSpace, attributes: {
        x1: xm,
        y1: ym,
        x2: xr,
        y2: yr
      }})
    ])
  );
}
