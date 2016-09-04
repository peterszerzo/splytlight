import h from 'virtual-dom/h';

import {smallSplytUnit} from '../constants/geometries';
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

function UnitControlCircle(point, dir, state, {
  onControlClick,
  onControlMouseEnter,
  onControlMouseLeave
}) {
  const controlStatus = state[dir] ? state[dir].status : 'neutral';
  return (
    h('g', {
      namespace: svgNameSpace,
      attributes: {
        transform: `translate(${point.x} ${point.y})`,
        fill: fillByControlStatus[controlStatus],
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      },
      onclick: () => {
        onControlClick(dir);
      },
      onmouseenter: (e) => {
        onControlMouseEnter(dir);
      },
      onmouseleave: () => {
        onControlMouseLeave(dir);
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

export default function UnitControls(state, actions) {
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
      UnitControlCircle(leftPoint, 'left', state, actions),
      UnitControlCircle(rightPoint, 'right', state, actions)
    ])
  );
}
