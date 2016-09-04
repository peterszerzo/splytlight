import h from 'virtual-dom/h';

import {smallSplytUnit} from '../constants/geometries';
import {
  getEndPoints
} from '../utilities/splyt.js';
import {svgNameSpace} from '../constants/strings';
import {
  brown,
  controlCircleRadius
} from '../constants/styling';

function UnitControlCircle(point, dir, state, {
  toggle,
  addDraft,
  removeDraft
}) {
  return (
    h('g', {
      namespace: svgNameSpace,
      attributes: {
        transform: `translate(${point.x} ${point.y})`,
        fill: brown,
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      },
      onclick: () => {
        toggle(dir);
      },
      onmouseenter: (e) => {
        addDraft(dir);
      },
      onmouseleave: () => {
        removeDraft(dir);
      }
    }, [
      h('circle', {
        namespace: svgNameSpace,
        attributes: {
          cx: 0,
          cy: 0,
          r: controlCircleRadius
        }
      })
    ])
  );
}

export default function UnitControls(state, {
  toggle,
  addDraft,
  removeDraft
}) {
  const [leftPoint, rightPoint] = getEndPoints(
    smallSplytUnit,
    {
      useOffset: false
    }
  );
  return (
    h('g', {namespace: svgNameSpace, attributes: {
      stroke: 'none'
    }}, [
      UnitControlCircle(leftPoint, 'left', state, {toggle, addDraft, removeDraft}),
      UnitControlCircle(rightPoint, 'right', state, {toggle, addDraft, removeDraft})
    ])
  );
}
