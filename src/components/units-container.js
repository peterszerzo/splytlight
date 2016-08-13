import h from 'virtual-dom/h';

import {svgNameSpace} from '../constants/strings';
import Units from './units';

export default function UnitsContainer({state, x, y}, {setState}) {
  const baseTranslation = {
    x: x / 2,
    y: y / 10
  };
  return (
    h('div', {className: 'units-container'}, [
      h('svg', {namespace: svgNameSpace, attributes: {viewBox: `0 0 ${x} ${y}`}}, [
        Units({
          state,
          x: baseTranslation.x,
          y: baseTranslation.y,
          angle: 0
        }, {setState})
      ])
    ])
  );
}
