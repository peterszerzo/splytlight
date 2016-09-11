import h from 'virtual-dom/h';
const {div} = require('hyperscript-helpers')(h);

import {svgNameSpace} from '../constants/strings';
import getContainerDimensions from '../utilities/layout';
import Units from './units';

export default function Editor({tree, ui}, {setState}) {
  const {width, height} = getContainerDimensions(ui);
  return (
    div('.units-container', [
      h('svg', {
        namespace: svgNameSpace,
        id: 'splyt-editor',
        attributes: {
          viewBox: `0 0 ${width} ${height}`
        }
      }, [
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
