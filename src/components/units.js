import h from 'virtual-dom/h';

import {svgNameSpace} from '../constants/strings';
import {smallSplytUnit} from '../constants/geometries';
import {getEndPoints} from '../utilities/splyt.js';
import Unit from './unit';

export default function Units({state, x, y, angle}, {setState}) {
  const {armAngle} = smallSplytUnit;
  const [{x: x1, y: y1}, {x: x2, y: y2}] = getEndPoints(smallSplytUnit);
  if (!state) {
    return;
  }
  return (
    h('g', {
      namespace: svgNameSpace,
      attributes: {
        transform: `translate(${x} ${y}) rotate(${angle * 180 / Math.PI})`,
      }
    }, [
      Unit({
        addLeft: () => {
          setState({
            left: state.left ? null : {
              status: 'added',
              size: 'small'
            }
          });
        },
        addRight: () => {
          setState({
            right: state.right ? null : {
              status: 'added',
              size: 'small'
            }
          });
        }
      }),
      Units({
        state: state.left,
        x: x1,
        y: y1,
        angle: Math.PI / 2 - armAngle
      }, {
        setState: (stateChange) => {
          setState({
            left: Object.assign({}, state.left, stateChange)
          });
        }
      }),
      Units({
        state: state.right,
        x: x2,
        y: y2,
        angle: - (Math.PI / 2 - armAngle)
      }, {
        setState: (stateChange) => {
          setState({
            right: Object.assign({}, state.right, stateChange)
          });
        }
      })
    ])
  );
}
