import h from 'virtual-dom/h';

import {svgNameSpace} from '../constants/strings';
import {smallSplytUnit} from '../constants/geometries';
import {blue, brown, strokeWeight} from '../constants/styling';
import {
  getEndPoints,
  getStartPoint,
  getMidPoint
} from '../utilities/splyt.js';

function Controls({
  toggle,
  addDraft,
  removeDraft
}) {
  const [{x: xl, y: yl}, {x: xr, y: yr}] = getEndPoints(
    smallSplytUnit,
    {
      useOffset: false
    }
  );
  return (
    h('g', {namespace: svgNameSpace, attributes: {
      stroke: 'none',
      fill: brown,
    }}, [
      h('circle', {
        namespace: svgNameSpace,
        attributes: {
          cx: xl,
          cy: yl,
          r: 10
        },
        onclick: () => {
          toggle('left');
        },
        onmouseenter: () => {
          addDraft('left');
        },
        onmouseleave: () => {
          removeDraft('left');
        }
      }),
      h('circle', {
        namespace: svgNameSpace,
        attributes: {
          cx: xr,
          cy: yr,
          r: 10
        },
        onclick: () => {
          toggle('right');
        },
        onmouseenter: () => {
          addDraft('right');
        },
        onmouseleave: () => {
          removeDraft('right');
        }
      })
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
      stroke: blue,
      'stroke-width': strokeWeight,
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

export default function Unit(state, callbacks) {
  return (
    h('g', {
      namespace: svgNameSpace,
      attributes: {
        opacity: state.status === 'added' ? 1 : .5
      }
    }, [
      Lines(),
      state.status === 'added' ? Controls(callbacks) : null
    ])
  );
}
