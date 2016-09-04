import h from 'virtual-dom/h';

import {svgNameSpace} from '../constants/strings';
import {splyt} from '../constants/geometries';
import {getEndPoints} from '../utilities/splyt';
import {setChildState} from '../state';
import Unit from './unit';

export default function Units({state, x, y, angle}, {setState}) {
  const {armAngle} = splyt.small;
  const [{x: x1, y: y1}, {x: x2, y: y2}] = getEndPoints(splyt.small);
  if (!state) {
    return;
  }
  return (
    h('g', {
      namespace: svgNameSpace,
      attributes: {
        opacity: state.status === 'added' ? 1 : .5,
        transform: `translate(${x} ${y}) rotate(${angle * 180 / Math.PI})`,
      }
    }, [
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
      }),
      Unit(state, {
        onControlClick(dir) {
          setState({
            [dir]: (state[dir] && ('added', 'removing').indexOf(state[dir].status) > -1)
              ?
              {
                status: 'adding',
                size: 'small'
              }
              :
              {
                status: 'added',
                size: 'small'
              }
          });
        },
        onControlMouseEnter(dir) {
          if (!state[dir]) {
            return setState({
              [dir]: {
                status: 'adding',
                size: 'small'
              }
            });
          }
          if (['adding', 'removing'].indexOf(state[dir].status) === -1) {
            setState({
              [dir]: Object.assign({}, state[dir], {status: 'removing'})
            });
          }
        },
        onControlMouseLeave(dir) {
          if (!state[dir]) {
            return;
          }
          if (state[dir].status === 'adding') {
            setState({
              [dir]: null
            });
          }
          if (state[dir].status === 'removing') {
            setState({
              [dir]: Object.assign({}, state[dir], {status: 'added'})
            });
          }
        }
      })
    ])
  );
}
