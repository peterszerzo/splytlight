import h from 'virtual-dom/h';

import {svgNameSpace} from '../constants/strings';
import {smallSplytUnit} from '../constants/geometries';
import {getEndPoints} from '../utilities/splyt.js';
import {setChildState} from '../state';
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
      Unit(state, {
        toggle(dir) {
          setState({
            [dir]: (state[dir] && state[dir].status === 'added') ? null : {
              status: 'added',
              size: 'small'
            }
          });
        },
        addDraft(dir) {
          if (!state[dir]) {
            setState({
              [dir]: {
                status: 'adding',
                size: 'small'
              }
            });
          }
        },
        removeDraft(dir) {
          if (state[dir] && state[dir].status === 'adding') {
            setState({
              [dir]: null
            });
          }
        }
      }),
      Units({
        state: state.left,
        x: x1,
        y: y1,
        angle: Math.PI / 2 - armAngle
      }, {
        setState: setChildState({state, setState}, 'left')
      }),
      Units({
        state: state.right,
        x: x2,
        y: y2,
        angle: - (Math.PI / 2 - armAngle)
      }, {
        setState: setChildState({state, setState}, 'right')
      })
    ])
  );
}
