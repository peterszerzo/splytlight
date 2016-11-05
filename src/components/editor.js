import h from 'react-hyperscript';

import {svgNameSpace} from '../constants/strings';
import getContainerDimensions from '../utilities/layout';
import Units from './units';

export default ({tree, ui}, {setState}) => {
  const {width, height} = getContainerDimensions(ui);
  return (
    h('div.units-container', [
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
          y: height * 9 / 10,
          angle: Math.PI
        }, {setState})
      ])
    ])
  );
};
