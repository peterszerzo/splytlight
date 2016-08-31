import h from 'virtual-dom/h';
import classNames from 'classnames';

import {smallSplytUnit} from '../constants/geometries';
import {
  getEndPoints
} from '../utilities/splyt.js';
import {svgNameSpace} from '../constants/strings';
import {
  brown,
  white,
  controlCircleRadius,
  controlCircleIconSize,
  controlCircleIconStrokeWidth
} from '../constants/styling';

function UnitControlCircleIcon() {
  return [
    h('line', {
      namespace: svgNameSpace,
      attributes: {
        'stroke-width': controlCircleIconStrokeWidth,
        stroke: white,
        x1: - controlCircleIconSize / 2,
        y1: 0,
        x2: controlCircleIconSize / 2,
        y2: 0
      }
    }),
    h('line', {
      namespace: svgNameSpace,
      attributes: {
        'stroke-width': controlCircleIconStrokeWidth,
        stroke: white,
        x1: 0,
        y1: - controlCircleIconSize / 2,
        x2: 0,
        y2: controlCircleIconSize / 2
      }
    })
  ];
}

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
      }),
      UnitControlCircleIcon()
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
