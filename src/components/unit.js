import h from 'virtual-dom/h';

import {svgNameSpace} from '../constants/strings';
import {smallSplytUnit} from '../constants/geometries';
import {
  getEndPoints,
  getStartPoint,
  getMidPoint
} from '../utilities/splyt.js';

function Controls({addLeft, addRight}) {
  const [{x: xl, y: yl}, {x: xr, y: yr}] = getEndPoints(
    smallSplytUnit,
    {
      useOffset: false
    }
  );
  return (
    h('g', {namespace: svgNameSpace, attributes: {
      stroke: 'none',
      fill: 'rgba(32, 26, 22)',
    }}, [
      h('circle', {namespace: svgNameSpace, attributes: {
        cx: xl,
        cy: yl,
        r: 10
      }, onclick: addLeft}),
      h('circle', {namespace: svgNameSpace, attributes: {
        cx: xr,
        cy: yr,
        r: 10
      }, onclick: addRight})
    ])
  );
}

function Lines() {
  const [{x: xl, y: yl}, {x: xr, y: yr}] = getEndPoints(
    smallSplytUnit, {
      useOffset: true
    }
  );
  const {x: x0, y: y0} = getStartPoint(
    smallSplytUnit, {
      useOffset: true
    }
  );
  const {x: xm, y: ym} = getMidPoint(
    smallSplytUnit
  );
  return (
    h('g', {namespace: svgNameSpace, attributes: {
      stroke: '#638FBE',
      'stroke-width': '6',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }}, [
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

export default function Unit({addLeft, addRight}) {
  return (
    h('g', {namespace: svgNameSpace}, [
      Lines(),
      Controls({addLeft, addRight})
    ])
  );
}
