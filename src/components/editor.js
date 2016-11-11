import h from 'react-hyperscript';

import getContainerDimensions from '../utilities/layout';
import Units from './units';

export default ({tree, ui}, {setState}) => {
  const {width, height} = getContainerDimensions(ui);
  return (
    h('div.units-container', [
      h('svg', {
        id: 'splyt-editor',
        viewBox: `0 0 ${width} ${height}`
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
