import h from 'virtual-dom/h';

import {svgNameSpace} from '../constants/strings';
import {smallSplytUnit} from '../constants/geometries';
import Unit from './unit';

export default function Units({state, x, y, angle}, {setState}) {
  const {baseHeight, armLength, armAngle} = smallSplytUnit;
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
            left: state.left ? null : {}
          });
        },
        addRight: () => {
          setState({
            right: state.right ? null : {}
          });
        }
      }),
      Units({
        state: state.left,
        x: - armLength * Math.cos(armAngle),
        y: + baseHeight + armLength * Math.sin(armAngle),
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
        x: + armLength * Math.cos(armAngle),
        y: + baseHeight + armLength * Math.sin(armAngle),
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
