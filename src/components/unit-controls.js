import h from 'virtual-dom/h';

import {splyt} from '../constants/geometries';
import {
  getEndPoints
} from '../utilities/splyt.js';
import {svgNameSpace} from '../constants/strings';
import {
  brown,
  green,
  red,
  controlCircleRadius
} from '../constants/styling';

const fillByControlStatus = {
  neutral: brown,
  adding: green,
  removing: red,
  added: brown
};

function UnitControlCircle(point, controlStatus, {
  onClick,
  onMouseEnter,
  onMouseLeave
}) {
  return (
    h('g', {
      namespace: svgNameSpace,
      attributes: {
        transform: `translate(${point.x} ${point.y})`,
        fill: fillByControlStatus[controlStatus],
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      },
      onclick: onClick,
      onmouseenter: onMouseEnter,
      onmouseleave: onMouseLeave
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
  onControlClick,
  onControlMouseEnter,
  onControlMouseLeave
}) {
  const [leftPoint, rightPoint] = getEndPoints(
    splyt[state.size],
    {
      useOffset: false
    }
  );
  return (
    h('g', {
      namespace: svgNameSpace,
      id: 'apples',
      attributes: {
        stroke: 'none'
      }
    }, [
      UnitControlCircle(leftPoint, state.left ? state.left.status : 'neutral', {
        onClick: onControlClick.bind(this, 'left'),
        onMouseEnter: onControlMouseEnter.bind(this, 'left'),
        onMouseLeave: onControlMouseLeave.bind(this, 'left')
      }),
      UnitControlCircle(rightPoint, state.right ? state.right.status : 'neutral', {
        onClick: onControlClick.bind(this, 'right'),
        onMouseEnter: onControlMouseEnter.bind(this, 'right'),
        onMouseLeave: onControlMouseLeave.bind(this, 'right')
      })
    ])
  );
}
