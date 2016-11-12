import {createElement} from 'react';
const {div, p, button, svg} = require('hyperscript-helpers')(createElement);

import cls from './style.css';
import getContainerDimensions from '../../utilities/layout';
import Units from './units';

export default ({tree, ui}, {setState}) => {
  const {width, height} = getContainerDimensions(ui);
  return (
    div({
      className: cls.container
    }, [
      svg({
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
