import h from 'virtual-dom/h';
import classNames from 'classnames';

import {smallSplytUnit} from '../constants/geometries';
import {
  getEndPoints
} from '../utilities/splyt.js';
import {svgNameSpace} from '../constants/strings';
import {brown, controlCircleRadius} from '../constants/styling';

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
      }
    }, [
      h('circle', {
        namespace: svgNameSpace,
        attributes: {
          className: classNames(
            'splyt-control',
            state[dir]
              ?
              `splyt-control--${state[dir].status}`
              :
              null
          ),
          cx: 0,
          cy: 0,
          r: controlCircleRadius
        },
        onclick: () => {
          toggle(dir);
        },
        onmouseenter: () => {
          addDraft(dir);
        },
        onmouseleave: () => {
          removeDraft(dir);
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
      stroke: 'none',
      fill: brown,
    }}, [
      UnitControlCircle(leftPoint, 'left', state, {toggle, addDraft, removeDraft}),
      UnitControlCircle(rightPoint, 'right', state, {toggle, addDraft, removeDraft})
    ])
  );
}
