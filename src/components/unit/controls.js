import h from 'virtual-dom/h';

import {splyt} from '../../constants/geometries';
import {
  getEndPoints
} from '../../utilities/splyt.js';
import {svgNameSpace} from '../../constants/strings';
import {
  brown,
  green,
  red,
  controlCircleRadius
} from '../../constants/styling';

const fillByControlStatus = {
  neutral: brown,
  adding: green,
  removing: red,
  added: brown
};

function ControlCircle(point, controlStatus, {
  onClick,
  onMouseOver,
  onMouseOut
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
      onClick,
      onMouseOver,
      onMouseOut
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

export default function Controls(state, {
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
      ControlCircle(leftPoint, state.left ? state.left.status : 'neutral', {
        onClick: onControlClick.bind(this, 'left'),
        onMouseOver: onControlMouseEnter.bind(this, 'left'),
        onMouseOut: onControlMouseLeave.bind(this, 'left')
      }),
      ControlCircle(rightPoint, state.right ? state.right.status : 'neutral', {
        onClick: onControlClick.bind(this, 'right'),
        onMouseOver: onControlMouseEnter.bind(this, 'right'),
        onMouseOut: onControlMouseLeave.bind(this, 'right')
      })
    ])
  );
}
