import h from 'virtual-dom/h';

import {svgNameSpace} from '../constants/strings';
import Units from './units';

export default function UnitsContainer({data, x, y}) {
  const baseTranslation = {
    x: x / 2,
    y: y / 10
  };
  return (
    h('svg', {namespace: svgNameSpace, attributes: {viewBox: `0 0 ${x} ${y}`}}, [
      Units(data, {
        x: baseTranslation.x,
        y: baseTranslation.y,
        angle: 0
      })
    ])
  );
}
