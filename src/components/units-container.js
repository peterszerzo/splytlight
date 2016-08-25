import h from 'virtual-dom/h';

import {svgNameSpace} from '../constants/strings';
import getVizContainerDimensions from '../utilities/layout';
import Units from './units';

export default function UnitsContainer({tree, ui}, {setState}) {
  const {width, height} = getVizContainerDimensions(ui);
  return (
    h('div', {className: 'units-container'}, [
      h('svg', {namespace: svgNameSpace, attributes: {viewBox: `0 0 ${width} ${height}`}}, [
        Units({
          state: tree,
          x: width / 2,
          y: height / 10,
          angle: 0
        }, {setState})
      ])
    ])
  );
}
