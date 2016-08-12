import h from 'virtual-dom/h';

import {svgNameSpace} from '../constants/strings';
import {splytUnit} from '../constants/geometries';
import Unit from './unit';

export default function Units(data, {x, y}) {
  const {baseHeight, armLength, armAngle} = splytUnit;
  if (!data) {
    return;
  }
  return (
    h('g', {
      namespace: svgNameSpace,
      attributes: {
        transform: `translate(${x} ${y})`,
      }
    }, [
      Unit(),
      Units(data.left, {
        x: - armLength * Math.cos(armAngle),
        y: + baseHeight + armLength * Math.sin(armAngle)
      }),
      Units(data.right, {
        x: + armLength * Math.cos(armAngle),
        y: + baseHeight + armLength * Math.sin(armAngle)
      })
    ])
  );
}
